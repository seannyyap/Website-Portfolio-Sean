type SanityClientLike = {
  fetch: (query: string, params?: Record<string, unknown>) => Promise<any>
  createOrReplace: (doc: Record<string, any>, options?: any) => Promise<any>
}

export type GitHubRepo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  homepage: string | null
  language: string | null
  topics?: string[]
}

export type SyncGithubProjectsResult = {
  syncedCount: number
  updatedCount: number
  preservedFeaturedCount: number
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function chooseIconName(tags: string[], language?: string | null) {
  const tokens = [...tags, language ?? ""].filter(Boolean).map((t) => t.toLowerCase())

  const dbTokens = ["postgres", "postgresql", "mysql", "sqlite", "mongodb", "redis", "sql", "database"]
  if (dbTokens.some((t) => tokens.includes(t))) return "Database"

  const aiTokens = [
    "ai",
    "openai",
    "langchain",
    "llm",
    "rag",
    "machine-learning",
    "machine learning",
    "ml",
    "pytorch",
    "tensorflow",
  ]
  if (aiTokens.some((t) => tokens.some((x) => x.includes(t)))) return "Bot"

  const webTokens = ["nextjs", "next.js", "react", "node", "node.js", "typescript", "javascript", "web"]
  if (webTokens.some((t) => tokens.includes(t) || tokens.some((x) => x.includes(t)))) return "Globe"

  return "Sparkles"
}

async function fetchGitHubRepos(username: string, limit: number): Promise<GitHubRepo[]> {
  const perPage = 100
  const listUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&sort=updated&direction=desc`

  const listRes = await fetch(listUrl, {
    headers: {
      Accept: "application/vnd.github.mercy-preview+json",
    },
  })

  if (!listRes.ok) {
    throw new Error(`GitHub API failed: ${listRes.status} ${listRes.statusText}`)
  }

  const listJson = await listRes.json()
  const repos: any[] = Array.isArray(listJson) ? listJson : []

  const sliced = repos.slice(0, Math.max(0, limit))

  // If topics are missing from the list endpoint, fetch each repo details.
  const withTopics = await Promise.all(
    sliced.map(async (repo: any) => {
      const maybeTopics: string[] | undefined =
        Array.isArray(repo.topics) && repo.topics.length > 0 ? repo.topics : undefined

      if (maybeTopics) {
        return repo as GitHubRepo
      }

      const owner = repo.owner?.login ?? username
      const detailUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo.name)}`

      const detailRes = await fetch(detailUrl, {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
        },
      })

      if (!detailRes.ok) return repo as GitHubRepo
      const detailJson = await detailRes.json()

      return {
        ...repo,
        topics: Array.isArray(detailJson?.topics) ? detailJson.topics : undefined,
      } as GitHubRepo
    })
  )

  return withTopics
    .filter((r) => r.name && r.full_name)
}

function repoToProject(doc: { repo: GitHubRepo; order: number; featured: boolean }) {
  const { repo, order, featured } = doc

  const slugCurrent = slugify(repo.name || String(repo.id)) || `repo-${repo.id}`

  const topics = Array.isArray(repo.topics) ? repo.topics.filter(Boolean) : []
  const tags = Array.from(new Set([...(topics ?? []), ...(repo.language ? [repo.language] : [])])).slice(0, 12)

  // iconName will be handled in a later step; we still compute it so the tool output is ready.
  const iconName = chooseIconName(tags, repo.language)

  return {
    // Required by schema
    _type: "project",
    title: repo.name,
    slug: { _type: "slug", current: slugCurrent },
    description: repo.description ?? "",
    tags,
    githubUrl: repo.html_url,
    liveUrl: repo.homepage ?? repo.html_url,
    featured,
    order,

    // Optional (schema might not include yet)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(iconName ? ({ iconName } as any) : {}),
  }
}

export async function syncGithubReposToSanityProjects({
  client,
  username,
  limit,
  markFeatured,
}: {
  client: SanityClientLike
  username: string
  limit: number
  markFeatured: boolean
}): Promise<SyncGithubProjectsResult> {
  const repos = await fetchGitHubRepos(username, limit)

  // Fetch existing featured flags to preserve them if user doesn't want to mark all.
  const existing = await client.fetch(`*[_type == "project"]{_id, featured}`)
  const existingFeaturedById = Object.fromEntries((existing ?? []).map((d: any) => [d._id, !!d.featured]))

  const preservedFeaturedCount = Object.values(existingFeaturedById).filter(Boolean).length

  const existingOrders = await client.fetch(`*[_type == "project" && defined(order)]{order}`)
  const maxOrder = Math.max(0, ...(existingOrders ?? []).map((d: any) => Number(d.order || 0)))

  let updatedCount = 0

  const ops = repos.map(async (repo, index) => {
    const docId = `project-${repo.full_name.replace("/", "-")}`
    const alreadyFeatured = !!existingFeaturedById[docId]

    const nextFeatured = markFeatured ? true : alreadyFeatured
    const projectOrder = maxOrder + index + 1

    const project = repoToProject({ repo, order: projectOrder, featured: nextFeatured })

    // Always use createOrReplace so repeated syncs are idempotent.
    // Note: `iconName` may fail if the schema doesn't include it yet.
    try {
      await client.createOrReplace({
        _id: docId,
        ...project,
      }, {})
    } catch (err) {
      // If the schema doesn't support iconName yet, retry without it.
      const { iconName, ...withoutIcon } = project as any
      await client.createOrReplace({
        _id: docId,
        ...withoutIcon,
      }, {})
    }

    updatedCount++
  })

  await Promise.all(ops)

  return {
    syncedCount: repos.length,
    updatedCount,
    preservedFeaturedCount,
  }
}

