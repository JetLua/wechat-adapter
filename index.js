import Canvas from './canvas'
import Image from './image'
import document from './document'
import navigator from './navigator'
import TouchEvent from './touch-event'
import {noop} from './util'

const
  {platform} = wx.getSystemInfoSync(),
  canvas = new Canvas()


GameGlobal.canvas = canvas

canvas.addEventListener = document.addEventListener
canvas.removeEventListener = document.removeEventListener

if (platform === 'devtools') {
  Object.defineProperties(window, {
    TouchEvent: {value: TouchEvent},
    Image: {value: Image},
    ontouchstart: {value: noop},
    addEventListener: {value: noop}
  })

  for (const key in document) {
    const desc = Object.getOwnPropertyDescriptor(window.document, key)
    if (!desc || desc.configurable) {
      Object.defineProperty(window.document, key, {value: document[key]})
    }
  }
} else {
  GameGlobal.TouchEvent = TouchEvent
  GameGlobal.Image = Image
  GameGlobal.ontouchstart = noop
  GameGlobal.window = GameGlobal
  GameGlobal.navigator = navigator
  GameGlobal.document = document
  GameGlobal.addEventListener = noop
}