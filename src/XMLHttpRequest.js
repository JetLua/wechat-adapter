import {noop} from './util'

export default class XMLHttpRequest {
  static UNSEND = 0
  static OPENED = 1
  static HEADERS_RECEIVED = 2
  static LOADING = 3
  static DONE = 4

  method = 'GET'
  dataType = 'text'
  responseType = 'utf-8'
  onreadystatechange = noop
  onloadend = noop
  onerror = noop

  event = {}
  responseHeader = {}

  header = {
    Accept: '*/*'
  }

  open(method, url) {
    this.method = method
    this.url = url
    this.readyState = XMLHttpRequest.OPENED
  }

  setRequestHeader(key, value) {
    this.header[key] = value
  }

  addEventListener(type, handle) {
    this.event[type] = this.event[type] || []
    this.event[type].push(handle)
  }

  getResponseHeader(key) {
    return this.responseHeader && this.responseHeader[key]
  }

  getAllResponseHeaders() {
    const header = this.responseHeader || {}
    return Object.entries(header).map(item => item.join(': ')).join('\r\n')
  }

  emit(type) {
    const
      handles = this.event[type],
      ev = {
        type,
        target: this,
        method: this.method,
        response: this.response,
        responseText: this.responseText,
        responseType: this.responseType
      }

    handles && handles.forEach(handle => handle.call(this, ev))

    type === 'load' && this.onload && this.onload(ev)
    type === 'error' && this.onerror && this.onerror(ev)
  }

  readFile(path, encoding) {
    return new Promise((resolve, reject) => {
      const fs = wx.getFileSystemManager()
      fs.readFile({
        encoding,
        filePath: path,
        success: info => resolve(info.data),
        fail: reject
      })
    })
  }

  send(data) {
    this.readyState = XMLHttpRequest.LOADING

    if (!this.url.match(/^(http(s)?:\/\/)\w+[^\s]+(\.[^\s]+){1,}/)) {
      this.readyState = XMLHttpRequest.DONE
      this.status = 200
      this.readFile(
        this.url,
        this.responseType === 'text' ? 'utf-8' : this.responseType
      ).then(res => {
        this.response =
        this.responseText = res
        this.emit('readystatechange')
        this.emit('load')
      }).catch(err => {
        this.response =
        this.responseText = err
        this.emit('error')
      })
    } else {
      wx.request({
        data,
        url: this.url,
        header: this.header,
        method: this.method,
        dataType: this.dataType,
        responseType: this.responseType === 'text' || this.responseType === 'arraybuffer' ? this.responseType : 'text',
        success: info => {
          this.readyState = XMLHttpRequest.DONE
          this.responseHeader = info.header
          this.status = info.statusCode
          this.response =
          this.responseText = info.data
          this.emit('load')
          this.emit('readystatechange')
          this.onloadend()
          this.onreadystatechange()
        },
        fail: info => {
          console.log('error', info)
          this.readyState = XMLHttpRequest.DONE
          this.status = info.statusCode
          this.response =
          this.responseText = info
          this.responseHeader = info.header
          this.emit('error')
          this.emit('readystatechange')
          this.onerror()
          this.onreadystatechange()
        }
      })
    }
  }
}
