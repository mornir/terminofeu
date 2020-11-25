import React from 'react'
import { Link } from 'part:@sanity/base/router'

export default {
  title: 'Begriff',
  name: 'termGroup',
  type: 'object',
  fields: [
    {
      title: 'Benennung',
      name: 'designation',
      type: 'string',
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'reference',
      description: (
        <span>
          Die Quelle muss vorher <Link href={'/desk/quellen'}>hier</Link>{' '}
          erfasst werden.
        </span>
      ),
      to: [{ type: 'source' }],
      options: {
        filter: ({ document, parentPath }) => {
          // Always make sure to check for document properties
          // before attempting to use them
          if (!parentPath[0] === 'content' && !parentPath[1]) {
            return {
              filter: 'lang == $lang',
              params: { lang: 'de' },
            }
          } else {
            return {
              filter: 'lang == $lang',
              params: {
                lang: parentPath[1],
              },
            }
          }
        },
      },
    },
  ],
}
