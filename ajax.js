import {noop} from './util'

export default class {
  method = 'GET'
  responseType = 'text'
  onreadystatechange = null

  header = {
    Accept: '*/*'
  }

  constructor() {

  }

  open(method, url) {
    this.method = method
    this.url = url
  }

  send(data) {
    wx.request({
      data,
      url: this.url,
      header: this.header,
      method: this.method,
      responseType: this.responseType,
      success: info => {
        this.readyState = 4
        this.status = statusCode
        this.response = info.data
      },
      fail: info => {
        this.readyState = 4
        this.status = info.statusCode
      }
    })
  }

  setRequestHeader(key, value) {
    this.header[key] = value
  }

  addEventListener(type, fn) {

  }
}