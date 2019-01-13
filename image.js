import {HTMLImageElement} from './element'

export default function() {
  const image = wx.createImage()
  image.__proto__.__proto__ = new HTMLImageElement()
  return image
}