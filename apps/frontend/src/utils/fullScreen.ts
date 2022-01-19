// @ts-nocheck
// ignored because the package works as is inside iui, adding types will not add value to this util
// and importing it from iui didn't work
const key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
  fullscreen: 6
}

const webkit = [
  'webkitFullscreenEnabled',
  'webkitFullscreenElement',
  'webkitRequestFullscreen',
  'webkitExitFullscreen',
  'webkitfullscreenchange',
  'webkitfullscreenerror',
  '-webkit-full-screen'
]

const moz = [
  'mozFullScreenEnabled',
  'mozFullScreenElement',
  'mozRequestFullScreen',
  'mozCancelFullScreen',
  'mozfullscreenchange',
  'mozfullscreenerror',
  '-moz-full-screen'
]

const ms = [
  'msFullscreenEnabled',
  'msFullscreenElement',
  'msRequestFullscreen',
  'msExitFullscreen',
  'MSFullscreenChange',
  'MSFullscreenError',
  '-ms-fullscreen'
]

// so it doesn't throw error if no window or document is present
const document =
  typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {}

const vendor =
  ('fullscreenEnabled' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (moz[0] in document && moz) ||
  (ms[0] in document && ms) ||
  []

const fullScreen = {
  requestFullscreen: (element): any => element[vendor[key.requestFullscreen]](),
  requestFullscreenFunction: (element): any => element[vendor[key.requestFullscreen]],
  get exitFullscreen(): any {
    if (document.fullscreenElement !== null) {
      return document[vendor[key.exitFullscreen]].bind(document)
    }
    return null
  },
  get fullscreenPseudoClass(): any {
    return `:${vendor[key.fullscreen]}`
  },
  addEventListener: (type, handler, options): any =>
    document.addEventListener(vendor[key[type]], handler, options),
  removeEventListener: (type, handler, options): any =>
    document.removeEventListener(vendor[key[type]], handler, options),
  get fullscreenEnabled(): any {
    return Boolean(document[vendor[key.fullscreenEnabled]])
  },
  // eslint-disable-next-line
  set fullscreenEnabled(val) {},
  get fullscreenElement(): any {
    return document[vendor[key.fullscreenElement]]
  },
  // eslint-disable-next-line
  set fullscreenElement(val) {},
  get onfullscreenchange(): any {
    return document[`on${vendor[key.fullscreenchange]}`.toLowerCase()]
  },
  set onfullscreenchange(handler) {
    return (document[`on${vendor[key.fullscreenchange]}`.toLowerCase()] = handler)
  },
  get onfullscreenerror(): any {
    return document[`on${vendor[key.fullscreenerror]}`.toLowerCase()]
  },
  set onfullscreenerror(handler) {
    return (document[`on${vendor[key.fullscreenerror]}`.toLowerCase()] = handler)
  }
}

export default fullScreen
