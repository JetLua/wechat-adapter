import Canvas from './canvas'
import document from './document'
import navigator from './navigator'
import TouchEvent from './touch-event'
import {noop} from './util'

const
  {platform} = wx.getSystemInfoSync(),
  canvas = new Canvas()


GameGlobal.canvas = canvas
GameGlobal.navigator = navigator
GameGlobal.document = document
GameGlobal.TouchEvent = TouchEvent

if (platform === 'devtools') {
  Object.defineProperties(window, {
    addEventListener: {value: noop}
  })

  for (const key in document) {
    const desc = Object.getOwnPropertyDescriptor(window.document, key)
    if (!desc || desc.configurable) {
      Object.defineProperty(window.document, key, {value: document[key]})
    }
  }

  canvas.addEventListener = window.document.addEventListener
  canvas.removeEventListener = window.document.removeEventListener

} else {
  GameGlobal.window = GameGlobal
}