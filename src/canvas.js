function Canvas() {
  const canvas = wx.createCanvas()
  canvas.style = {cursor: null}
  return canvas
}

const canvas = new Canvas()

export {
  canvas,
  Canvas
}
