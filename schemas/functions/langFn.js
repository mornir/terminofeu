// import { description } from './sourceFn'

export default ({ title, code }) => {
  return {
    title,
    name: code,
    type: 'object',
    fieldset: code,
    fields: [
      {
        type: 'array',
        name: 'terms',
        title: 'Benennung',
        of: [{ type: 'term' }],
      },
      {
        name: 'definition',
        title: 'Definition BSV 2026',
        type: 'blockContent',
      },
      {
        name: 'definitionSource',
        title: 'Quelle der Definition',
        type: 'sourceReference',
        description:
          'Sind mehrere Quellen vorhanden, ist die zuverlässigste aufzuführen.',
      },

      {
        name: 'note',
        title: 'Anmerkung',
        type: 'blockContent',
      },
      {
        name: 'notesSource',
        title: 'Quelle der Anmerkung',
        type: 'sourceReference',
        description:
          'Sind mehrere Quellen vorhanden, ist die zuverlässigste aufzuführen.',
      },
      {
        name: 'approvals',
        title: 'Ich bin mit dem obigen Definitionsvorschlag einverstanden.',
        description: 'Ja oder Nein abstimmen',
        type: 'array',
        of: [{ type: 'approval' }],
        options: {
          sortable: false,
        },
      },
      {
        title: 'Definitionen aus bestehenden Regelwerken',
        name: 'definitions',
        type: 'array',
        of: [{ type: 'definition' }],
        options: {
          sortable: false,
        },
      },
    ],
  }
}
