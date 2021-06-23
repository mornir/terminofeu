import React, { useEffect, useState } from 'react'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import sanityClient from 'part:@sanity/base/client'
import styles from './styles.css'
import { List, Item } from 'part:@sanity/components/lists/default'
import { Select, Label, Card, Stack, Text } from '@sanity/ui'
import { RiFileExcel2Line } from 'react-icons/ri'
import { statusList } from '../../schemas/data/statusList'

function toPlainText(blocks = []) {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== 'block' || !block.children) {
          return ''
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join('')
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  )
}

function DownloadsList() {
  const [values, setValues] = useState([])

  async function saveAsExcel() {
    try {
      if (values.length === 0) return

      const selectedStatus = values.map((s) => `"${s}"`).join(', ')

      const query = /* groq */ `*[_type == 'entry' && status in [${selectedStatus}]] {status, deTitle, 'definition': content.de.definition, 'note': content.de.note} | order(deTitle desc)`

      const entries = await sanityClient.fetch(query)

      const workbook = new ExcelJS.Workbook()
      workbook.creator = 'VKF'
      const fileName = 'Terminofeu_Export.xlsx'
      const worksheet = workbook.addWorksheet('Deutsch')
      worksheet.columns = [
        { header: 'Begriff', key: 'term', width: 32 },
        { header: 'Definition', key: 'definition', width: 62 },
        { header: 'Anmerkung', key: 'note', width: 62 },
        { header: 'Status', key: 'status', width: 28 },
      ]

      entries.forEach((entry) => {
        const note = entry.note ? toPlainText(entry.note) : ''
        const definition = entry.definition ? toPlainText(entry.definition) : ''
        worksheet.addRow({
          status: entry.status,
          term: entry.deTitle,
          definition,
          note,
        })
      })

      const buffer = await workbook.xlsx.writeBuffer()

      saveAs(new Blob([buffer]), fileName)
    } catch (error) {
      console.error(error)
    }
  }

  function setOptions(e) {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setValues(values)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Download Center</h2>
      </header>
      <div className={styles.content}>
        <Stack padding={[2, 2, 3]} space={2}>
          <Text size={1}>
            Für Mehrfachauswahl: <br></br>
            <kbd>Ctrl</kbd> gedrückt halten
          </Text>

          <Select
            fontSize={2}
            padding={[2, 2, 3]}
            space={[2, 2, 3]}
            multiple
            onChange={setOptions}
            style={{ height: '150px' }}
          >
            {statusList.map(({ title, value }) => (
              <option value={value} selected={value === 'definition'}>
                {title}
              </option>
            ))}
          </Select>
        </Stack>
        <List className={styles.list}>
          <Item>
            <button className={styles.link} type="button" onClick={saveAsExcel}>
              <RiFileExcel2Line size={'2em'} />
              Excel (.xlsx)
            </button>
          </Item>
        </List>
      </div>
    </div>
  )
}

export default {
  name: 'downloads-list',
  component: DownloadsList,
}
