import type { StructureResolver } from 'sanity/structure';

/**
 * Single fixed-id doc for skills so editors always land on one "Skills" entry.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Skills page')
        .id('skillsPage')
        .child(
          S.document().schemaType('skillsPage').documentId('skillsPage').title('Skills page'),
        ),
      S.listItem()
        .title('Resume PDF')
        .id('resumePdf')
        .child(
          S.document().schemaType('resumePdf').documentId('resumePdf').title('Resume PDF'),
        ),
      ...S.documentTypeListItems().filter(
        (item) => !['skillsPage', 'resumePdf'].includes(item.getId() ?? ''),
      ),
    ]);
