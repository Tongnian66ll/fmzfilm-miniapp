const app = getApp()

// 管理密码
const ADMIN_PASSWORD = 'tongnian666'

Page({
  data: {
    userInfo: null,
    isLoggedIn: false,
    showWechatQR: false,
    easterEggCount: 0,
    menuItems: [
      { id: 'my-bookings', label: '我的预约', icon: '📋', desc: '查看提交记录' },
      { id: 'wechat', label: '添加微信', icon: '💬', desc: '微信号：njfmz1' },
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
      case 'my-bookings':
        wx.navigateTo({ url: '/pages/bookings-list/bookings-list' })
        break
      case 'wechat':
        this.setData({ showWechatQR: true })
        break
      case 'about':
        wx.showModal({
          title: '分秒帧影视',
          content: '南京分秒帧影视有限公司\n\n专业影视制作团队\n50+项目经验 · 18项电影节入围\n从创意到成片，以帧级精度打磨每一部作品',
          showCancel: false,
          confirmText: '知道了'
        })
        break
      case 'share':
        break
    }
  },

  // ========== 彩蛋逻辑 ==========
  onVersionTap() {
    const count = this.data.easterEggCount + 1
    this.setData({ easterEggCount: count })

    if (count >= 5) {
      this.setData({ easterEggCount: 0 })
      this.showPasswordModal()
    } else if (count >= 3) {
      wx.showToast({ title: `还差${5 - count}次`, icon: 'none', duration: 800 })
    }
  },

  showPasswordModal() {
    wx.showModal({
      title: '管理员验证',
      content: '请输入管理密码',
      editable: true,
      placeholderText: '请输入密码',
      confirmText: '确认',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          if (res.content === ADMIN_PASSWORD) {
            wx.showToast({ title: '验证通过', icon: 'success' })
            setTimeout(() => {
              wx.navigateTo({ url: '/pages/admin-bookings/admin-bookings' })
            }, 800)
          } else {
            wx.showToast({ title: '密码错误', icon: 'none' })
          }
        }
      }
    })
  },

  // ========== 弹窗控制 ==========
  closeWechatQR() {
    this.setData({ showWechatQR: false })
  },

  onShareAppMessage() {
    return {
      title: '分秒帧影视 - 专业影视制作',
      path: '/pages/index/index'
    }
  }
})
