import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  featured,
  iconName
}`);

export const EXPERIENCE_QUERY = defineQuery(`*[_type == "experience"] | order(order asc) {
  _id,
  period,
  title,
  company,
  description,
  technologies,
  order
}`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  _id,
  brandName,
  brandAccent,
  navigation{
    ctaLabel,
    links[]{label, href}
  },
  hero{
    kicker,
    headline,
    rotatingWords,
    description,
    socialLinks[]{label, url, iconName}
  },
  about{
    kicker,
    headline,
    bio,
    skills[]{name, tag, description, iconName},
    highlights[]{title, description, iconName}
  },
  techStack{
    kicker,
    headline,
    technologies[]{name, category, iconName}
  },
  contact{
    kicker,
    headline,
    subheading,
    email,
    location,
    introTitle,
    introBody,
    socialLinks[]{label, url}
  },
  footer{
    tagline,
    socialLinks[]{label, url}
  }
}`);
