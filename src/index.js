import {noop} from './util'
import Image from './Image'
import location from './location'
import document from './document'
import navigator from './navigator'
import TouchEvent from './TouchEvent'
import {canvas, Canvas} from './canvas'
import XMLDocument from './XMLDocument'
import localStorage from './localStorage'
import XMLHttpRequest from './XMLHttpRequest'
import {Element, HTMLCanvasElement, HTMLImageElement, HTMLVideoElement} from './element'

const {platform} = wx.getSystemInfoSync()


GameGlobal.canvas = canvas
canvas.addEventListener = document.addEventListener
canvas.removeEventListener = document.removeEventListener

if (platform === 'devtools') {
  Object.defineProperties(window, {
    Image: {value: Image},
    Element: {value: Element},
    ontouchstart: {value: noop},
    addEventListener: {value: noop},
    TouchEvent: {value: TouchEvent},
    XMLDocument: {value: XMLDocument},
    localStorage: {value: localStorage},
    XMLHttpRequest: {value: XMLHttpRequest},
    HTMLVideoElement: {value: HTMLVideoElement},
    HTMLImageElement: {value: HTMLImageElement},
    HTMLCanvasElement: {value: HTMLCanvasElement},
  })

  for (const key in document) {
    const desc = Object.getOwnPropertyDescriptor(window.document, key)
    if (!desc || desc.configurable) {
      Object.defineProperty(window.document, key, {value: document[key]})
    }
  }
} else {
  GameGlobal.Image = Image
  GameGlobal.window = GameGlobal
  GameGlobal.ontouchstart = noop
  GameGlobal.document = document
  GameGlobal.location = location
  GameGlobal.navigator = navigator
  GameGlobal.TouchEvent = TouchEvent
  GameGlobal.addEventListener = noop
  GameGlobal.removeEventListener = noop
  GameGlobal.localStorage = localStorage
  GameGlobal.XMLHttpRequest = XMLDocument
  GameGlobal.XMLHttpRequest = XMLHttpRequest
  GameGlobal.HTMLImageElement = HTMLImageElement
  GameGlobal.HTMLVideoElement = HTMLVideoElement
  GameGlobal.HTMLCanvasElement = HTMLCanvasElement
  GameGlobal.WebGLRenderingContext = GameGlobal.WebGLRenderingContext || {}
}
