import {HTMLImageElement} from './element'

export default function(cb) {
  const image = wx.createImage()
  // image.onload = cb
  // image.__proto__.__proto__ = new HTMLImageElement()
  return image
}