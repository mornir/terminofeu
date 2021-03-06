/*** This document type is currently unused. ***/

import { AiOutlineApartment } from 'react-icons/ai'

import { langs } from '../data/langs'

export default {
  title: 'Sachgebiet',
  name: 'domain',
  type: 'document',
  icon: AiOutlineApartment,
  fields: langs.map(({ title, code }) => ({
    name: code + 'Title',
    title,
    type: 'string',
  })),
  preview: {
    select: {
      title: 'deTitle',
      subtitle: 'frTitle',
      description: 'itTitle',
    },
  },
}
