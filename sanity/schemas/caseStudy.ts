import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    orderRankField({ type: 'caseStudy' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies & skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        }),
      ],
    }),
    defineField({
      name: 'url',
      title: 'Project / case URL',
      type: 'url',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order (legacy)',
      description: 'Hidden — use Case studies (drag & drop) list to reorder.',
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
    select: { title: 'title', client: 'client', media: 'image' },
    prepare({ title, client, media }) {
      return {
        title: title || 'Untitled',
        subtitle: client ? `Client: ${client}` : undefined,
        media,
      };
    },
  },
});
