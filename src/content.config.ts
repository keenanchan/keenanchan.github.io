import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects collection: one Markdown file per project in src/content/projects/.
 * To add a project, copy an existing .md file and edit the frontmatter.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      url: z.string().url(),
      image: image(),
      imageAlt: z.string(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
    }),
});

export const collections = { projects };
