export default function() {
    const video = wx.createVideo({width: 0, height: 0, controls: false})
    video.canPlayType = () => {
        return true;
    }
    return video
  }
  