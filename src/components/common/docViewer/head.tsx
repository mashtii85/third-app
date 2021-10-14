import { IHeaderOverride } from 'react-doc-viewer'

const DocViewerHead: IHeaderOverride = (state, previousDocument, nextDocument) => {
  if (!state.currentDocument || state.config?.header?.disableFileName) {
    return <></>
  }
  const { documents, currentFileNo } = state

  return (
    <>
      {documents?.length > 1 && (
        <div>
          <button onClick={previousDocument} disabled={currentFileNo === 0}>
            Previous Document
          </button>
          <button onClick={nextDocument} disabled={currentFileNo >= documents.length - 1}>
            Next Document
          </button>
        </div>
      )}
    </>
  )
}
export default DocViewerHead
