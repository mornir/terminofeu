import React from 'react'
import { Link } from 'part:@sanity/base/router'

// Les termes à ajouter ici doivent d'abord être créés ici.

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
        title: 'Begriffe',
        description: (
          <span>
            Begriffe, die hier hinzugefügt werden sollen, müssen zuerst{' '}
            <Link
              href={`/intent/create/type=deTerm;template=${code}Term`}
              target="_blank"
            >
              hier erfasst werden
            </Link>
          </span>
        ),
        of: [
          {
            type: 'reference',
            to: [{ type: `${code}Term` }],
            options: {
              filter: `count(*[references(^._id)]) == 0`,
            },
          },
        ],
      },
      {
        type: 'blockContent',
        name: 'definition',
        title: 'Definition(en)',
        description:
          'Die Definition soll so kurz wie möglich und so ausführlich wie nötig sein.',
      },
      {
        title: 'Abbildungen',
        name: 'illustrations',
        type: 'array',
        description: 'Zeichnungen, grafische Darstellungen oder Schemata',
        of: [{ type: 'illustration' }],
      },
    ],
  }
}
