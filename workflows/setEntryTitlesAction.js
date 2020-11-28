import { useState, useEffect } from 'react'
import { useDocumentOperation } from '@sanity/react-hooks'

export function setEntryTitlesAction(props) {
  if (props.type !== 'entry') {
    return null
  }

  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft])

  return {
    disabled: publish.disabled,
    label: isPublishing ? 'Publishing…' : 'Publish',
    onHandle: () => {
      // This will update the button text
      setIsPublishing(true)

      //content.terms[0].designation

      // Set publishedAt to current date and time
      patch.execute([{ set: { deTitle: 'testing' } }])

      // Perform the publish
      publish.execute()

      // Signal that the action is completed
      props.onComplete()
    },
  }
}
