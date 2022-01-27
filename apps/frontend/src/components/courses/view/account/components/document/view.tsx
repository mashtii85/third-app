/**
 * Components - Courses - View - Account - Components - Document
 */

// React
import { useState } from 'react'

// UI
import DocumentViewer from '../../../../../common/docViewer/docViewer'

export const CourseLessonDocument = ({ filename }: { filename: string }) => {
  const url = `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${filename}`
  const [exists, setExists] = useState<boolean>(false)
  fetch(url, { method: 'HEAD' }).then((result) => setExists(result.ok))

  return <>{exists ? <DocumentViewer docs={[{ uri: url }]} /> : 'No Document'}</>
}
