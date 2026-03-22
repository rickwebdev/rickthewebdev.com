import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'workProject',
  title: 'Work project',
  type: 'document',
  fields: [
    orderRankField({ type: 'workProject' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'Short line under the title (services, stack, etc.)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ allowRelative: true }),
    }),
    defineField({
      name: 'image',
      title: 'Card image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Important for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order (legacy)',
      description: 'Hidden — use Work projects (drag & drop) list to reorder. Kept for older migrated content.',
      type: 'number',
      initialValue: 0,
      hidden: true,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  orderings: [
    orderRankOrdering,
    {
      title: 'Sort order (legacy)',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }, { field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Untitled', subtitle, media };
    },
  },
});
