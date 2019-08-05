import {noop} from './util'

export default class {
  method = 'GET'
  responseType = 'text'
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
    const handles = this.event[type]
    handles && handles.forEach(handle => {
      handle.call(this, {target: this})
    })
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

  async send(data) {
    if (!this.url.match(/^https?/)) {
      this.readyState = 4
      this.status = 200
      this.responseText =
      this.response = await this.readFile(
        this.url,
        this.responseType === 'arraybuffer' ? this.responseType : 'utf-8'
      )
      this.emit('readystatechange')
      this.emit('load')
    } else {
      wx.request({
        data,
        url: this.url,
        header: this.header,
        method: this.method,
        dataType: 'raw',
        responseType: this.responseType,
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
          this.emit('error')
          this.emit('readystatechange')
        }
      })
    }
  }
}