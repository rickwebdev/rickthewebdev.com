import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type { StructureResolver } from 'sanity/structure';

/**
 * Single fixed-id doc for skills so editors always land on one "Skills" entry.
 * Work projects + case studies use drag-and-drop order (orderRank via @sanity/orderable-document-list).
 */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        type: 'workProject',
        title: 'Work projects',
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'caseStudy',
        title: 'Case studies',
        S,
        context,
      }),
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
        (item) =>
          !['skillsPage', 'resumePdf', 'workProject', 'caseStudy'].includes(item.getId() ?? ''),
      ),
    ]);
