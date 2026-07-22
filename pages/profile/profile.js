const app = getApp()

Page({
  data: {
    userInfo: null,
    isLoggedIn: false,
    showWechatQR: false,
    pendingCount: 0,
    menuItems: [
      { id: 'my-bookings', label: '预约管理', icon: '📋' },
      { id: 'wechat', label: '添加微信', icon: '💬', desc: '微信号：njfmz1' },
      { id: 'about', label: '关于我们', icon: '🏢' },
      { id: 'share', label: '分享给朋友', icon: '📤' },
    ]
  },

  onShow() {
    this.checkLogin()
    this.loadPendingCount()
  },

  checkLogin() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo, isLoggedIn: true })
    } else {
      this.setData({ userInfo: null, isLoggedIn: false })
    }
  },

  async loadPendingCount() {
    try {
      // 尝试从云端获取待处理数量
      const res = await wx.cloud.callFunction({
        name: 'getAllBookings',
        data: {}
      })
      if (res.result && res.result.success) {
        const pendingCount = (res.result.data || []).filter(b => b.status === 'pending').length
        this.setData({ pendingCount })
      }
    } catch (e) {
      // 云端不可用，尝试本地
      try {
        const db = wx.cloud.database()
        const _ = db.command
        const res = await db.collection('bookings')
          .where({ status: 'pending' })
          .count()
        this.setData({ pendingCount: res.total })
      } catch (e2) {
        console.log('获取待处理数量失败', e2)
      }
    }
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善用户信息',
      success: (res) => {
        const userInfo = res.userInfo
        wx.setStorageSync('userInfo', userInfo)
        this.setData({ userInfo, isLoggedIn: true })
      },
      fail: () => {
        wx.showToast({ title: '授权已取消', icon: 'none' })
      }
    })
  },

  onMenuTap(e) {
    const id = e.currentTarget.dataset.id
    switch (id) {
      case 'my-bookings':
        wx.navigateTo({ url: '/pages/admin-bookings/admin-bookings' })
        break
      case 'wechat':
        this.setData({ showWechatQR: true })
        break
      case 'about':
        wx.showModal({
          title: '关于分秒帧影视',
          content: '南京分秒帧影视有限公司\n\n专业影视制作团队，50+项目经验\n18项电影节入围\n100+剧本保障\n\n从创意到成片，以帧级精度打磨每一部作品',
          showCancel: false,
          confirmText: '知道了'
        })
        break
      case 'share':
        break
    }
  },

  closeWechatQR() {
    this.setData({ showWechatQR: false })
  },

  copyWechat() {
    wx.setClipboardData({
      data: 'njfmz1',
      success: () => {
        wx.showToast({ title: '微信号已复制', icon: 'success' })
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '分秒帧影视 - 专业影视制作',
      path: '/pages/index/index'
    }
  }
})
