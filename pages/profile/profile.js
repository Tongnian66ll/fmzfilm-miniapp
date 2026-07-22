const app = getApp()

Page({
  data: {
    userInfo: null,
    isLoggedIn: false,
    showWechatQR: false,
    menuItems: [
      { id: 'wechat', label: '添加微信', icon: '💬', desc: '微信号：njfmz1' },
      { id: 'my-bookings', label: '我的预约', icon: '📋' },
      { id: 'about', label: '关于我们', icon: '🏢' },
      { id: 'share', label: '分享给朋友', icon: '📤' },
    ]
  },

  onShow() {
    this.checkLogin()
  },

  checkLogin() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo, isLoggedIn: true })
    } else {
      this.setData({ userInfo: null, isLoggedIn: false })
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
      case 'wechat':
        this.setData({ showWechatQR: true })
        break
      case 'my-bookings':
        wx.showToast({ title: '功能开发中', icon: 'none' })
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
