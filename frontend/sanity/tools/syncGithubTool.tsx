import { useMemo, useState } from "react"
import { useClient } from "sanity"
import { syncGithubReposToSanityProjects } from "../lib/github"

type SyncStatus = "idle" | "running" | "done" | "error"

export function SyncGithubTool() {
  const client = useClient({ apiVersion: "2024-01-01" })

  const [username, setUsername] = useState("seannyyap")
  const [limit, setLimit] = useState(10)
  const [markFeatured, setMarkFeatured] = useState(false)
  const [status, setStatus] = useState<SyncStatus>("idle")
  const [message, setMessage] = useState<string>("")

  const canRun = useMemo(() => {
    return username.trim().length > 0 && limit > 0 && status !== "running"
  }, [username, limit, status])

  async function onRun() {
    setStatus("running")
    setMessage("Syncing GitHub repos into Sanity projects...")

    try {
      const result = await syncGithubReposToSanityProjects({
        client: client as any,
        username: username.trim(),
        limit,
        markFeatured,
      })

      setStatus("done")
      setMessage(
        `Synced ${result.syncedCount} repo(s). Updated: ${result.updatedCount}. Existing preserved: ${result.preservedFeaturedCount}.`
      )
    } catch (err: any) {
      setStatus("error")
      setMessage(err?.message ? String(err.message) : "Sync failed. Check console/logs.")
      // Keep the error visible while also returning a user-friendly message.
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 720 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Sync from GitHub</h2>
      <p style={{ marginTop: 8, opacity: 0.9, lineHeight: 1.4 }}>
        Fetches public repositories and upserts them into the Sanity <code>project</code> documents.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 12, marginTop: 16 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.9 }}>GitHub username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px 12px",
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: 8,
              background: "transparent",
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.9 }}>Limit</span>
          <input
            type="number"
            value={limit}
            min={1}
            onChange={(e) => setLimit(Math.max(1, Number(e.target.value || 10)))}
            style={{
              padding: "10px 12px",
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: 8,
              background: "transparent",
            }}
          />
        </label>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
        <input type="checkbox" checked={markFeatured} onChange={(e) => setMarkFeatured(e.target.checked)} />
        <span style={{ fontSize: 13, opacity: 0.95 }}>Set all synced projects as featured</span>
      </label>

      <button
        onClick={onRun}
        disabled={!canRun}
        style={{
          marginTop: 16,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.15)",
          cursor: canRun ? "pointer" : "not-allowed",
          background: canRun ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.03)",
          fontWeight: 600,
        }}
      >
        {status === "running" ? "Syncing..." : "Sync from GitHub"}
      </button>

      {message ? (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "rgba(0,0,0,0.03)",
            lineHeight: 1.4,
          }}
        >
          {message}
        </div>
      ) : null}
    </div>
  )
}

/**
 * Sanity Studio tool definition.
 * This is registered from `frontend/sanity.config.ts` in the `tools: [...]` array.
 */
export function syncGithubTool() {
  return {
    title: "Sync from GitHub",
    name: "sync-from-github",
    component: SyncGithubTool,
  }
}

