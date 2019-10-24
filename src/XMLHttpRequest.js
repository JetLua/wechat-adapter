import {noop} from './util'

export default class {
  method = 'GET'
  dataType = 'json'
  responseType = 'utf-8'
  onreadystatechange = noop
  abort = noop
  event = {}

  header = {
    Accept: '*/*'
  }

  open(method, url) {
    this.method = method
    this.url = url
  }

  setRequestHeader(key, value) {
    this.header[key] = value
  }

  addEventListener(type, handle) {
    this.event[type] = this.event[type] || []
    this.event[type].push(handle)
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
    if (!this.url.match(/^https?/)) {
      this.readyState = 4
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
          this.readyState = 4
          this.status = info.statusCode
          this.responseText =
          this.response = info.data
          this.emit('load')
          this.emit('readystatechange')
        },
        fail: info => {
          this.readyState = 4
          this.status = info.statusCode
          this.response =
          this.responseText = info
          this.emit('error')
          this.emit('readystatechange')
        }
      })
    }
  }
}