import Tabs from 'sanity-plugin-tabs'

import illustrationFn from '../builder/illustrationFn'
import { langs } from '../builder/langs'

import { generateStatus } from '../builder/status'
import { description } from '../builder/sourceData'

export default {
  title: 'Bild',
  name: 'illustration',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: generateStatus('abbildung'),
      },
    },
    {
      type: 'image',
      title: 'Abbildung',
      name: 'image',
      description: 'Sprachneutrale Abbildung mit Nummerierung',
    },
    {
      title: 'Quelle der Abbildung',
      name: 'source',
      type: 'reference',
      description: description,
      to: [{ type: 'source' }],
    },
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: langs.map(({ title, code }) => ({ name: code, title })),
      fields: langs.map((lang) => illustrationFn(lang)),
    },
  ],
  preview: {
    select: {
      media: 'image',
      title: 'content.de.title',
      status: 'status',
    },
    prepare({ status, title, media }) {
      const subtitle = status
        ? generateStatus('abbildung').find((s) => s.value === status).title
        : 'kein Status'

      return {
        media,
        title,
        subtitle,
      }
    },
  },
}
