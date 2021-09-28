interface Video {
  title: string
  desc: string
  isFavorite?: boolean
  src: string
}
export interface VideoProgress {
  played: number
  playedSeconds: number
  loaded: number
  loadedSeconds: number
}

export interface VideoPlayerProps {
  videos: Video[]
  onVideoFinished?: (videoIndex: number) => void
}

export interface PlayerState {
  pip: boolean
  playing: boolean
  controls: boolean
  light: boolean
  volume: number
  muted: boolean
  played: number
  loaded: number
  duration: number
  playbackRate: number
  showVolumeControl: boolean
  loop: boolean
  fullScreen: boolean
  selectedVideoIndex: number
}

type SetVolume = {
  type: 'changeVolume'
  payload: number
}
type SetPlaybackSpeed = {
  type: 'changePlaybackSpeed'
  payload: number
}
type SetProgress = {
  type: 'changeProgress'
  payload: number
}
type SetDuration = {
  type: 'setDuration'
  payload: number
}
type SetShowVolumeControl = {
  type: 'setShowVolumeControl'
  payload: boolean
}
type SetVideo = {
  type: 'setPlayingVideo'
  payload: number
}

type ToggleIsPlaying = {
  type: 'toggleIsPlaying'
}

type ToggleFullScreen = {
  type: 'toggleFullScreen'
}

export type PlayerActionTypes =
  | SetVolume
  | SetProgress
  | ToggleIsPlaying
  | ToggleFullScreen
  | SetDuration
  | SetShowVolumeControl
  | SetPlaybackSpeed
  | SetVideo

export interface SpeedOption {
  optionName: string
  optionValue: number
  selected: boolean
}
export type SpeedSetting = {
  type: 'speed'
  title: string
  options: SpeedOption[]
}
export type SettingType = SpeedSetting
export interface SettingProps {
  selectedSpeed: number
  onSpeedChange: (speed: SpeedOption) => void
}
