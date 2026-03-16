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
import { PROJECTS_QUERY, EXPERIENCE_QUERY } from "@/sanity/lib/queries"

export default async function Home() {
  const [projects, experience] = client 
    ? await Promise.all([
        client.fetch(PROJECTS_QUERY).catch(() => []),
        client.fetch(EXPERIENCE_QUERY).catch(() => []),
      ])
    : [[], []]

  return (
    <>
      <SmoothScroll />
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <TechStack />
        <Projects projects={projects} />
        <Experience milestones={experience} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
