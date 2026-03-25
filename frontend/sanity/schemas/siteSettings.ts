import { defineField, defineType } from "sanity";

const iconOptions = [
  { title: "Bot", value: "Bot" },
  { title: "Sparkles", value: "Sparkles" },
  { title: "Database", value: "Database" },
  { title: "Globe", value: "Globe" },
  { title: "Brain", value: "Brain" },
  { title: "Code2", value: "Code2" },
  { title: "Cpu", value: "Cpu" },
  { title: "Layout", value: "Layout" },
  { title: "Terminal", value: "Terminal" },
  { title: "Layers", value: "Layers" },
  { title: "Workflow", value: "Workflow" },
  { title: "Cloud", value: "Cloud" },
  { title: "Zap", value: "Zap" },
  { title: "Box", value: "Box" },
  { title: "FileCode", value: "FileCode" },
  { title: "Search", value: "Search" },
  { title: "Paintbrush", value: "Paintbrush" },
];

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandAccent",
      title: "Brand Accent",
      type: "string",
      description: 'Small suffix like ".dev" or similar.',
    }),

    defineField({
      name: "navigation",
      title: "Navigation",
      type: "object",
      fields: [
        defineField({
          name: "ctaLabel",
          title: "CTA Label",
          type: "string",
          initialValue: "Say Hello",
        }),
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "href", title: "Href", type: "string", validation: (Rule) => Rule.required() }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "rotatingWords",
          title: "Rotating Words",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required() }),
                defineField({
                  name: "iconName",
                  title: "Icon",
                  type: "string",
                  options: { list: iconOptions },
                  initialValue: "Globe",
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "about",
      title: "About",
      type: "object",
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "bio",
          title: "Bio Paragraphs",
          type: "array",
          of: [{ type: "text" }],
        }),
        defineField({
          name: "skills",
          title: "Skills",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "tag", title: "Tag", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
                defineField({
                  name: "iconName",
                  title: "Icon",
                  type: "string",
                  options: { list: iconOptions },
                  initialValue: "Sparkles",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
                defineField({
                  name: "iconName",
                  title: "Icon",
                  type: "string",
                  options: { list: iconOptions },
                  initialValue: "Sparkles",
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "object",
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "technologies",
          title: "Technologies",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "category", title: "Category", type: "string" }),
                defineField({
                  name: "iconName",
                  title: "Icon",
                  type: "string",
                  options: { list: iconOptions },
                  initialValue: "Zap",
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "location", title: "Location", type: "string" }),
        defineField({ name: "introTitle", title: "Intro Title", type: "string" }),
        defineField({ name: "introBody", title: "Intro Body", type: "text", rows: 3 }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required() }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2 }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required() }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "brandName" },
    prepare({ title }) {
      return { title: title || "Site Settings" };
    },
  },
});

