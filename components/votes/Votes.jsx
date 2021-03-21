import React, { useState } from 'react'
import { Box, Heading, Inline, Radio, Flex } from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client'
import { useDocumentOperation } from '@sanity/react-hooks'
import userStore from 'part:@sanity/base/user'
import { nanoid } from 'nanoid'

import styles from './Votes.css'

function Votes({ document }) {
  const { displayed, published } = document
  const [vote, setVote] = useState('')
  function postVote(event) {
    setVote(event.target.value)
  }

  return (
    <div className={styles.container} lang="de">
      <Box marginBottom={4}>
        <Heading as="h2" size={1}>
          Soll der Begriff bzw. das Konzept in Entwurf übernommen?
        </Heading>
      </Box>
      <Inline space={6}>
        <Flex align="center">
          <Radio
            checked={vote === 'approve'}
            name="approve"
            value="approve"
            id="approve"
            onChange={postVote}
          />

          <label htmlFor="approve" class={styles.radioLabel}>
            Ja
          </label>
        </Flex>
        <Flex align="center">
          <Radio
            checked={vote === 'reject'}
            name="reject"
            value="reject"
            id="reject"
            onChange={postVote}
          />
          <label htmlFor="reject" class={styles.radioLabel}>
            Nein
          </label>
        </Flex>
      </Inline>
    </div>
  )
}

export default Votes
