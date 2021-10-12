import styled from 'styled-components'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

import DocViewerHead from './head'

interface DocViewerProps {
  docs: {
    uri: string
    fileType?: string
    fileData?: string | ArrayBuffer
  }[]
  height?: string
}

const DocumentViewer = (props: DocViewerProps) => {
  const { docs, height = '600px' } = props
  return (
    <StyledDocViewer
      height={height}
      config={{
        header: {
          overrideComponent: DocViewerHead
        }
      }}
      pluginRenderers={DocViewerRenderers}
      documents={docs}
    />
  )
}
const StyledDocViewer = styled(DocViewer) <{ height?: string }>`
  border-radius: 8px;
  height: ${({ height }) => height};
`
export default DocumentViewer
