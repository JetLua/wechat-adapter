import {canvas} from './canvas'

export class Element {
  style = {cursor: null}

  pathname = ''

  appendChild() {}

  removeChild() {}

  addEventListener() {}

  removeEventListener() {}

  setAttribute() {}
}

export const HTMLCanvasElement = canvas.constructor

export const HTMLImageElement = wx.createImage().constructor

export class HTMLVideoElement extends Element {

}
