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

export class HTMLImageElement extends wx.createImage().constructor {

}

export class HTMLVideoElement extends Element {

}
