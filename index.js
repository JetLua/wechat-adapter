import {canvas, Canvas} from './canvas'
import Image from './image'
import document from './document'
import navigator from './navigator'
import TouchEvent from './touch-event'
import {Element, HTMLCanvasElement, HTMLImageElement} from './element'
import location from './location'
import localStorage from './localStorage'
import {noop} from './util'

const {platform} = wx.getSystemInfoSync()


GameGlobal.canvas = canvas
canvas.addEventListener = document.addEventListener
canvas.removeEventListener = document.removeEventListener

if (platform === 'devtools') {
  Object.defineProperties(window, {
    TouchEvent: {value: TouchEvent},
    Image: {value: Image},
    ontouchstart: {value: noop},
    addEventListener: {value: noop},
    localStorage: {value: localStorage},
    HTMLImageElement: {value: HTMLImageElement},
    HTMLCanvasElement: {value: HTMLCanvasElement},
    Element: {value: Element}
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
  GameGlobal.navigator = navigator
  GameGlobal.document = document
  GameGlobal.addEventListener = noop
  GameGlobal.location = location
  GameGlobal.localStorage = localStorage
  GameGlobal.HTMLImageElement = HTMLImageElement
  GameGlobal.HTMLCanvasElement = HTMLCanvasElement
  GameGlobal.window = GameGlobal
}