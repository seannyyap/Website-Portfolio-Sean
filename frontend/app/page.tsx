import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { TechStack } from "@/components/tech-stack"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { client } from "@/sanity/lib/client"
import { PROJECTS_QUERY, EXPERIENCE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries"

// Keep content reasonably fresh while preserving static caching benefits.
export const revalidate = 300

export default async function Home() {
  let projects: any[] = []
  let experience: any[] = []
  let site: any = null

  if (client) {
    const [projectsResult, experienceResult, siteResult] = await Promise.allSettled([
      client.fetch(PROJECTS_QUERY),
      client.fetch(EXPERIENCE_QUERY),
      client.fetch(SITE_SETTINGS_QUERY),
    ])

    if (projectsResult.status === "fulfilled" && Array.isArray(projectsResult.value)) {
      projects = projectsResult.value
    }
    if (experienceResult.status === "fulfilled" && Array.isArray(experienceResult.value)) {
      experience = experienceResult.value
    }
    if (siteResult.status === "fulfilled") {
      site = siteResult.value
    }
  }

  return (
    <>
      <SmoothScroll />
      <Navigation site={site} />
      <main id="main-content">
        <Hero site={site} />
        <About site={site} />
        <TechStack site={site} />
        <Projects projects={projects} />
        <Experience milestones={experience} />
        <Contact site={site} />
      </main>
      <Footer site={site} />
    </>
  )
}
