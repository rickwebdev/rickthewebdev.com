import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'toolSection',
  title: 'Technology section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'e.g. "Languages & Frameworks"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Plain text; use line breaks for separate lines (same as your current site).',
      type: 'text',
      rows: 8,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Section' };
    },
  },
});
