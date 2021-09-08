import styled from 'styled-components'
import VideoPlayer from '../components/common/videoPlayer/videoPlayer'

const PlaygroundPage = () => {
  return (
    <Wrapper>
      <VideoPlayer
        videos={[
          {
            title: 'This is the video title',
            desc: 'video descriptions',
            isFavorite: false,
            src: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4'
          }
        ]}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 700px;
`
export default PlaygroundPage
