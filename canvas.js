import {HTMLCanvasElement} from './element'

function Canvas() {
  const canvas = wx.createCanvas()
  canvas.__proto__.__proto__ = new HTMLCanvasElement()
  return canvas
}

const canvas = new Canvas()

export {
  canvas,
  Canvas
}