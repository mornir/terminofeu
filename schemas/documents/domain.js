import { AiOutlineApartment } from 'react-icons/ai'

import { langs } from '../builder/langs'

export default {
  title: 'Sachgebiete',
  name: 'domain',
  type: 'document',
  icon: AiOutlineApartment,
  fields: langs.map(({ title, code }) => ({
    name: code + 'Title',
    title,
    type: 'string',
  })),
}