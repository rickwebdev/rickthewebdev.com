import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'skillsPage',
  title: 'Skills page',
  type: 'document',
  fields: [
    defineField({
      name: 'coreSkillsHeading',
      title: 'Core skills heading',
      type: 'string',
      initialValue: 'CORE SKILLS',
    }),
    defineField({
      name: 'coreSkills',
      title: 'Core skills',
      description: 'One bullet per row',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'toolsHeading',
      title: 'Technologies & tools heading',
      type: 'string',
      initialValue: 'TECHNOLOGIES & TOOLS',
    }),
    defineField({
      name: 'toolSections',
      title: 'Technology sections',
      type: 'array',
      of: [{ type: 'toolSection' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Skills page' };
    },
  },
});
