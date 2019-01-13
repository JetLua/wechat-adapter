import {Canvas} from './canvas'
import Image from './image'
import {Element} from './element'

const stack = {}

export default {
  body: new Element('body'),

  addEventListener(type, handle) {
    stack[type] = stack[type] || []
    stack[type].push(handle)
  },

  removeEventListener(type, handle) {
    if (stack[type] && stack[type].length) {
      const i = stack[type].indexOf(handle)
      i !== -1 && stack[type].splice(i)
    }
  },

  dispatch(ev) {
    const queue = stack[ev.type]
    queue && queue.forEach(handle => handle(ev))
  },

  createElement(tag) {
    switch (tag) {
      case 'canvas': {
        return new Canvas()
      }

      case 'img': {
        return new Image()
      }

      default: {
        return new Element()
      }
    }
  }
}