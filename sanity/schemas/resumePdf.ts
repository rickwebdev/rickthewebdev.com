import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'resumePdf',
  title: 'Resume PDF',
  type: 'document',
  fields: [
    defineField({
      name: 'note',
      title: 'Editor note',
      description: 'Optional — not shown on the site',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'PDF file',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Resume PDF' };
    },
  },
});
