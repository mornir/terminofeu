import Tabs from 'sanity-plugin-tabs'
import langFn from '../builder/langFn'

import { langs } from '../builder/langs'

import { getPublishedId } from 'part:@sanity/base/util/draft-utils'

export default {
  name: 'entry',
  title: 'Einträge',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: [
          { title: 'Entwurf', value: 'draft' },
          { title: 'Im Definitionsprozess', value: 'definition' },
          { title: 'Fachliche Freigabe', value: 'approved' },
          { title: 'Im Übersetzungsprozess', value: 'translation' },
          { title: 'Freigabe durch Kernausschuss', value: 'validated' },
          { title: 'Übernommen in BSV 2026', value: 'in_force' },
        ],
      },
    },
    {
      title: 'Verwandte Einträge',
      name: 'relatedEntries',
      type: 'array',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'reference',
          to: [{ type: 'entry' }],
          options: {
            filter: ({ document }) => {
              return {
                filter: '_id != $id',
                params: {
                  id: getPublishedId(document._id),
                },
              }
            },
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: langs.map(({ title, code }) => ({ name: code, title })),
      fields: langs.map((lang) => langFn(lang)),
    },
  ],
  initialValue: {
    status: 'draft',
  },
  preview: {
    select: {
      term: 'content.de.terms.0.term.designation',
      definition: 'content.de.definition',
    },
    prepare({ term, definition }) {
      const block = (definition || []).find((block) => block._type === 'block')
      return {
        title: term,
        subtitle: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'Keine Definition',
      }
    },
  },
  orderings: [
    {
      title: 'Alphabetical',
      name: 'alphabetical',
      by: [{ field: 'content.de.title', direction: 'asc' }],
    },
  ],
}
