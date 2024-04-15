import {canvas} from './canvas'
import {img} from './Image'

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


export class HTMLImageElement extends img.constructor {

}

export class HTMLVideoElement extends Element {

}
