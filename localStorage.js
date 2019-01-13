export default {
  getItem(key) {
    return wx.getStorageSync(key)
  },

  setItem(key, val) {
    return wx.setStorageSync(key, val)
  },

  clear() {
    wx.clearStorageSync()
  }
}