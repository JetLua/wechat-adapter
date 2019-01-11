import Element from './element'

export default function() {
  const canvas = wx.createCanvas()
  canvas.__proto__.__proto__ = new Element()
  return canvas
}