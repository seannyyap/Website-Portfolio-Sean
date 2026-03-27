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
  resume{
    file
  },
  hero{
    rotatingWords,
    description,
    socialLinks[]{label, url, iconName}
  },
  about{
    bio,
    skills[]{name, tag, description, iconName},
    highlights[]{title, description, iconName}
  },
  techStack{
    technologies[]{name, category, iconName}
  },
  contact{
    email,
    socialLinks[]{label, url}
  },
  footer{
    socialLinks[]{label, url}
  }
}`);
