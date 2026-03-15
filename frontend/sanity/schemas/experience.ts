import { defineField, defineType } from "sanity";

/**
 * Experience document schema.
 * Matches the shape used by the Experience component (period, title, company, description, technologies).
 */
export const experienceSchema = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "e.g. 2023 — Present",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
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
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first (most recent at top)",
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Period (new first)", name: "periodDesc", by: [{ field: "order", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "company" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
