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
  featured
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
