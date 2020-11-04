export default {
  title: 'Begriffe IT',
  name: 'itTerm',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      type: 'string',
      name: 'term',
      title: 'Begriff',
      validation: (Rule) => Rule.required().error('Pflichtfeld'),
    },
    {
      type: 'blockContent',
      name: 'sourceTerm',
      title: 'Quelle des Begriffs',
    },
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: [
          { title: 'Hauptbegriff', value: 'hauptbegriff' },
          { title: 'genormt', value: 'genormt' },
          { title: 'nicht genormt', value: 'nicht_genormt' },
          { title: 'veraltet', value: 'neu' },
          { title: 'abzulehnen', value: 'abzulehnen' },
          { title: 'zulässig', value: 'zulässig' },
        ],
      },
    },
    {
      type: 'array',
      name: 'additionnalFields',
      title: 'Weitere Felder',
      description: 'Anmerkung, Abkürzung, usw.',
      of: [{ type: 'abbreviation' }, { type: 'notice' }],
    },
  ],
  preview: {
    select: {
      title: 'term',
    },
  },
}
