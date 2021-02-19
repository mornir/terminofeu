import React, { useEffect, useState } from 'react'
import sanityClient from 'part:@sanity/base/client'
import { statusList } from '../../schemas/data/statusList'
import { Heading } from '@sanity/ui'

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts'

// Sanity uses CSS modules for styling. We import a stylesheet and get an
// object where the keys matches the class names defined in the CSS file and
// the values are a unique, generated class name. This allows you to write CSS
// with only your components in mind without any conflicting class names.
// See https://github.com/css-modules/css-modules for more info.
import styles from './MyTool.css'

const list = statusList
  .map(
    ({ title, value }) =>
      `"${title}": count(*[_type == "entry" && status == "${value}"])`
  )
  .join(',')

const query = `
{
   ${list}
}`

function MyTool() {
  const [data, setData] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(query)
      .then((counts) => {
        const cleanedData = Object.entries(counts)
          .map(([title, value]) => {
            if (value === 0) return null
            return {
              title,
              value,
            }
          })
          .filter(Boolean)
        setData(cleanedData)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className={styles.container}>
      <Heading as="h2" size={3} marginBottom={3} paddinLeft={4}>
        Einträgeanzahl je nach Status
      </Heading>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/*  <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />

        <Tooltip />
      </PieChart> */}
    </div>
  )
}

export default MyTool
