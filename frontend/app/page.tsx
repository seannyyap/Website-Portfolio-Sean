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

// Ensure newly synced Sanity documents show up immediately (no stale cached GROQ results).
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Home() {
  const [projects, experience, site] = client 
    ? await Promise.all([
        client.fetch(PROJECTS_QUERY).catch(() => []),
        client.fetch(EXPERIENCE_QUERY).catch(() => []),
        client.fetch(SITE_SETTINGS_QUERY).catch(() => null),
      ])
    : [[], [], null]

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
