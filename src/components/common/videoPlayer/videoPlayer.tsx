import { FC } from 'react'
import styled from 'styled-components'
import { VideoPlayerProps } from './type'

const VideoPlayer: FC<VideoPlayerProps> = ({ videoSources }) => {
  const video = videoSources[0]
  if (!video) {
    throw new Error('video is not provided for video player')
  }

  return <StyledVideo src={video} controls />
}

const StyledVideo = styled.video`
  width: 100%;
`

export default VideoPlayer
