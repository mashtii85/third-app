import { ChangeEvent, useReducer, useRef } from 'react'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'

import styled, { css } from 'styled-components'
import { FavIcon } from './components/favIcon'
import { FullScreen } from './components/fullScreen'
import { Next } from './components/next'
import { PlayPause } from './components/playPause'
import { Previous } from './components/prev'
import { Revert } from './components/revert'
import { Setting } from './components/setting/setting'
import { Skip } from './components/skip'
import { Volume } from './components/volume'
import { numberOfSecondsToTime } from './helpers'
import {
  PlayerActionTypes,
  PlayerState,
  SpeedOption,
  VideoPlayerProps,
  VideoProgress
} from './type'

const reducer = (state: PlayerState, action: PlayerActionTypes) => {
  const newState = { ...state }

  switch (action.type) {
    case 'changeVolume': {
      newState.volume = action.payload
      return { ...newState }
    }
    case 'changeProgress': {
      newState.played = action.payload
      return { ...newState }
    }
    case 'toggleIsPlaying': {
      newState.playing = !newState.playing
      return { ...newState }
    }
    case 'setDuration': {
      newState.duration = action.payload
      return { ...newState }
    }
    case 'setShowVolumeControl': {
      newState.showVolumeControl = action.payload
      return { ...newState }
    }
    case 'setPlayingVideo': {
      newState.selectedVideoIndex = action.payload
      return { ...newState }
    }
    case 'changePlaybackSpeed': {
      newState.playbackRate = action.payload
      return { ...newState }
    }
    default: {
      return { ...newState }
    }
  }
}

const VideoPlayer = ({ videos, onVideoFinished }: VideoPlayerProps) => {
  const playerRef = useRef<BaseReactPlayer<{}>>(null)

  const spentTime = useRef('0')

  const isSeeking = useRef(false)

  const [state, dispatch] = useReducer(reducer, {
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    showVolumeControl: false,
    selectedVideoIndex: 0
  })
  const { src, title, desc } = videos[state.selectedVideoIndex]

  if (!src) {
    throw new Error('video is not provided for video player')
  }

  const togglePlayPause = () => {
    dispatch({ type: 'toggleIsPlaying' })
  }
  const handleEnded = () => {
    if (onVideoFinished) {
      onVideoFinished(state.selectedVideoIndex)
    }
  }

  const handleDuration = (e: number) => {
    dispatch({ type: 'setDuration', payload: e })
  }

  const handleProgress = (progressData: VideoProgress) => {
    spentTime.current = progressData.playedSeconds.toString()
    dispatch({ type: 'changeProgress', payload: progressData.played })
  }
  const handleRevertClick = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10)
  }
  const handleSkipClick = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10)
  }

  const handleSeekMouseDown = () => {
    isSeeking.current = true
  }
  const handleSeekMouseUp = () => {
    isSeeking.current = false
  }
  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isSeeking.current) {
      playerRef.current?.seekTo(+e.target.value, 'fraction')
    }
  }
  const handleVolumeMouseOver = () => {
    dispatch({ type: 'setShowVolumeControl', payload: true })
  }

  const handleVolumeMouseLeave = () => {
    dispatch({ type: 'setShowVolumeControl', payload: false })
  }

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'changeVolume', payload: parseFloat(e.target.value) })
  }
  const handleSpeedChange = (e: SpeedOption) => {
    dispatch({ type: 'changePlaybackSpeed', payload: e.optionValue })
  }
  const handlePreviousClick = () => {
    if (state.selectedVideoIndex !== 0) {
      dispatch({ type: 'setPlayingVideo', payload: state.selectedVideoIndex - 1 })
    }
  }
  const handleNextClick = () => {
    if (state.selectedVideoIndex !== videos.length - 1) {
      dispatch({ type: 'setPlayingVideo', payload: state.selectedVideoIndex + 1 })
    }
  }

  let time
  if (spentTime.current) {
    const pureSeconds = spentTime.current.split('.')[0]
    time = numberOfSecondsToTime(+pureSeconds)
  }
  let duration
  if (state.duration) {
    duration = numberOfSecondsToTime(+state.duration)
  }

  return (
    <Wrapper>
      <HeadOverlay>
        <InfoWrapper>
          <VideoTitle>{title}</VideoTitle>
          <VideoDesc>{desc}</VideoDesc>
        </InfoWrapper>
        <FavIconWrapper>
          <FavIcon />
        </FavIconWrapper>
      </HeadOverlay>
      {/* <StyledVideo src={src} /> */}
      <ReactPlayer
        ref={playerRef}
        width="100%"
        pip={state.pip}
        playing={state.playing}
        controls={state.controls}
        light={state.light}
        volume={state.volume}
        muted={state.muted}
        played={state.played}
        loaded={state.loaded}
        duration={state.duration}
        playbackRate={state.playbackRate}
        loop={state.loop}
        url={src}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onSeek={(e) => console.log('onSeek', e)}
        onEnded={handleEnded}
        onError={(e) => console.log('onError', e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      <BottomOverlay>
        <MainControlsWrapper>
          <IconWrapper onClick={togglePlayPause}>
            <PlayPause isPlaying={state.playing} />
          </IconWrapper>
          <IconWrapper onClick={handleRevertClick}>
            <Revert />
          </IconWrapper>
          <IconWrapper onClick={handleSkipClick}>
            <Skip />
          </IconWrapper>
          <IconWrapper onClick={handlePreviousClick}>
            <Previous />
          </IconWrapper>
          <IconWrapper onClick={handleNextClick}>
            <Next />
          </IconWrapper>
          <Time>{time}</Time>
          <ProgressInput
            width="212px"
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={state.played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />{' '}
          <Time>{duration}</Time>
        </MainControlsWrapper>
        <MainControlsWrapper>
          <IconWrapper onMouseOver={handleVolumeMouseOver} onMouseLeave={handleVolumeMouseLeave}>
            <Volume />
            <VolumeControlInputWrapper visible={state.showVolumeControl === true}>
              <VolumeControlInput
                width="100px"
                type="range"
                min={0}
                max={1}
                step="any"
                value={state.volume}
                onChange={handleVolumeChange}
              />
            </VolumeControlInputWrapper>
          </IconWrapper>
          <Setting selectedSpeed={state.playbackRate} onSpeedChange={handleSpeedChange} />
          <FullScreen />
        </MainControlsWrapper>
      </BottomOverlay>
    </Wrapper>
  )
}

const Time = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: white;
  align-self: center;
`

const ProgressInput = styled.input<{ value: number; width: string }>`
  -webkit-appearance: none;
  align-self: center;
  background: rgba(255, 255, 255, 0.6);
  background-image: linear-gradient(#b6da25, #b6da25);
  background-repeat: no-repeat;
  background-size: ${({ value }) => value * 100}% 100%;
  border-radius: 5px;
  height: 4px;
  width: ${({ width }) => width};

  /* Input Thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 2px 0 #555;
    cursor: ew-resize;
    height: 16px;
    transition: background 0.3s ease-in-out;
    width: 16px;
  }

  &::-webkit-slider-thumb:hover {
    background: #b6da25;
  }

  /* Input Track */
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: transparent;
    border: none;
    box-shadow: none;
  }
`

const VolumeControlInputWrapper = styled.div<{ visible: boolean }>`
  height: 30px;
  left: -50px;
  opacity: 0;
  padding-left: 27px;
  pointer-events: none;
  position: absolute;
  top: -70px;
  transform: rotateZ(-90deg) translateX(-10px);
  transition: all 0.3s ease;
  width: 130px;
  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      pointer-events: all;
      transform: rotateZ(-90deg) translateX(0px);
    `}
`

const VolumeControlInput = styled(ProgressInput)`
  &::-webkit-slider-thumb {
    cursor: n-resize;
  }
`

const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
`

const MainControlsWrapper = styled.div`
  display: flex;
  gap: 12px;
`

const Overlay = styled.div`
  align-items: center;
  background: rgba(81, 81, 81, 0.5);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  position: absolute;
  width: 100%;
`
const BottomOverlay = styled(Overlay)`
  bottom: 0rem;
`

const HeadOverlay = styled(Overlay)`
  top: 0;
`
const FavIconWrapper = styled.div``
const InfoWrapper = styled.div``
const VideoTitle = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`
const VideoDesc = styled.p`
  color: white;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
`

const Wrapper = styled.div`
  background: black;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  width: 100%;
`

export default VideoPlayer
