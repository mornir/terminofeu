import Tabs from 'sanity-plugin-tabs'
import { AiOutlineContainer } from 'react-icons/ai'

import langFn from '../builder/langFn'
import { langs } from '../builder/langs'

export const statusList = [
  { title: 'BSV 2015', value: 'draft' },
  { title: 'Entwurf', value: 'new_draft' },
  { title: 'Im Definitionsprozess', value: 'definition' },
  { title: 'Fachliche Freigabe', value: 'approved' },
  { title: 'Im Übersetzungsprozess', value: 'translation' },
  { title: 'Freigabe durch Kernausschuss', value: 'validated' },
  { title: 'Übernommen in BSV 2026', value: 'in_force' },
  { title: 'Nicht übernommen in BSV 2026', value: 'rejected' },
]

export default {
  name: 'entry',
  title: 'Eintrag',
  type: 'document',
  icon: AiOutlineContainer,
  fields: [
    {
      name: 'approvals',
      title: 'Wollen wir diesen Begriff in den BSV 2026?',
      type: 'array',
      of: [{ type: 'approval' }],
    },
    {
      title: 'Bemerkungen',
      name: 'notes',
      type: 'array',
      of: [{ type: 'note' }],
    },
    ...langs.map(({ title, code }) => {
      return {
        title,
        type: 'string',
        name: code + 'Title',
        hidden: true,
      }
    }),
    {
      type: 'string',
      name: 'status',
      title: 'Bearbeitungsstatus',
      options: {
        list: statusList,
      },
      validation: (Rule) => Rule.required().error('Pflichtfeld'),
    },
    {
      title: 'Interne Bemerkungen',
      description: 'FELD NICHT MEHR VERWENDEN',
      name: 'internalNotes',
      type: 'text',
      rows: 5,
    },

    /*   {
      name: 'collection',
      title: 'Terminologiesammlung',
      type: 'string',
      options: {
        list: [{ title: 'BSV 10-15', value: 'bsv_10-15' }],
      },
    }, */
    /*     {
      name: 'domain',
      title: 'Sachgebiet',
      type: 'reference',
      to: [{ type: 'domain' }],
    }, */
    /*     {
      title: 'Verwandte Einträge',
      name: 'relatedEntries',
      type: 'array',
      description: 'Verweis auf einen Ober-, Unter- oder Nebenbegriff',
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
    }, */
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: langs.map(({ title, code }) => ({ name: code, title })),
      fields: langs.map((lang) => langFn(lang)),
      options: {
        // setting layout to object will group the tab content in an object fieldset border.
        // ... Useful for when your tab is in between other fields inside a document.
        layout: 'object',
      },
    },
    {
      title: 'Abbildungen',
      name: 'illustrations',
      type: 'array',
      description: 'Zeichnungen, grafische Darstellungen oder Schemata',
      of: [{ type: 'illustration' }],
    },
  ],
  initialValue: {
    status: 'new_draft',
  },
  preview: {
    select: {
      title: 'content.de.terms.0.designation',
      subtitle: 'content.fr.terms.0.designation',
      description: 'content.it.terms.0.designation',
    },
  },
  orderings: [
    {
      title: 'DE A->Z',
      name: 'deAlphabetical',
      by: [{ field: 'deTitle', direction: 'asc' }],
    },
    {
      title: 'FR A->Z',
      name: 'frAlphabetical',
      by: [{ field: 'frTitle', direction: 'asc' }],
    },
  ],
}
