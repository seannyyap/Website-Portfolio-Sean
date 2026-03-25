import { defineField, defineType } from "sanity";

/**
 * Project document schema.
 * Matches the shape used by the Projects component (title, description, tags, links, featured, image).
 */
export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "tags",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "liveUrl",
      title: "Live Demo URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show in the featured projects section",
    }),
    defineField({
      name: "iconName",
      title: "Icon Name",
      type: "string",
      initialValue: "Sparkles",
      options: {
        list: [
          { title: "Bot", value: "Bot" },
          { title: "Sparkles", value: "Sparkles" },
          { title: "Database", value: "Database" },
          { title: "Globe", value: "Globe" },
        ],
      },
      description:
        "Which Zen icon to display for this project. Used by the frontend Projects section.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Title A–Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare({ title, media }) {
      return { title, media };
    },
  },
});
