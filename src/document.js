import {Canvas} from './canvas'
import Image from './Image'
import {Element} from './element'

const stack = {}

export default {
  body: new Element('body'),

  cookie: '',

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
    tag = tag.toLowerCase()
    switch (tag) {
      case 'canvas': {
        return new Canvas()
      }

      case 'image':
      case 'img': {
        return new Image()
      }

      default: {
        return new Element()
      }
    }
  }
}
