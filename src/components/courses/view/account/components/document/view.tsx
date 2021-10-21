/**
 * Components - Cources - View - Account - Components - Document
 */

// UI
import DocumentViewer from '../../../../../common/docViewer/docViewer'

export const CourseLessonDocument = ({ filename }: { filename: string }) => {
  return (
    <>
      {filename ? (
        <DocumentViewer
          docs={[
            {
              uri: `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${filename}`
            }
          ]}
        />
      ) : (
        'No Document'
      )}
    </>
  )
}
