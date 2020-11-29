export default {
  widgets: [
    {
      name: 'welcome',
      layout: {
        width: 'full',
        height: 'small',
      },
    },
    {
      name: 'document-list',
      options: {
        title: 'Zuletzt bearbeitete Einträge',
        order: '_updatedAt desc',
        limit: 10,
        types: ['entry'],
      },
    },
    {
      name: 'document-list',
      options: {
        title: 'Zuletzt bearbeitete Quellen',
        order: '_updatedAt desc',
        limit: 10,
        types: ['source'],
      },
    },
    {
      name: 'project-users',
    },
  ],
}
