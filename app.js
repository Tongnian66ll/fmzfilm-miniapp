App({
  globalData: {
    userInfo: null,
    openid: '',
  },
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'fmzfilm-prod',
        traceUser: true,
      })
    }
    this.getOpenId()
  },
  async getOpenId() {
    try {
      const res = await wx.cloud.callFunction({ name: 'getOpenId' })
      this.globalData.openid = res.result.openid
    } catch (err) {
      console.error('获取openid失败', err)
    }
  }
})
