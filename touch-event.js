import document from './document'

class TouchEvent {
  constructor(type) {
    this.type = type
  }

  preventDefault() {

  }
}

function factory(type) {
  return ev => {
    const touchEvent = new TouchEvent(type)
    touchEvent.touches = ev.touches
    touchEvent.targetTouches = ev.touches
    touchEvent.changedTouches = ev.changedTouches
    touchEvent.timeStamp = ev.timeStamp
    document.dispatch(touchEvent)
  }
}

wx.onTouchStart(factory('touchstart'))
wx.onTouchMove(factory('touchmove'))
wx.onTouchEnd(factory('touchend'))
wx.onTouchCancel(factory('touchcancel'))

export default TouchEvent