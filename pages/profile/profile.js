const app = getApp()

// 管理密码（可修改）
const ADMIN_PASSWORD = 'tongnian666'

Page({
  data: {
    userInfo: null,
    isLoggedIn: false,
    showWechatQR: false,
    showAbout: false,
    showPwdDialog: false,
    pendingCount: 0,
    pwdInput: '',
    easterEggCount: 0,
    menuItems: [
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
      case 'wechat':
        this.setData({ showWechatQR: true })
        break
      case 'about':
        this.setData({ showAbout: true, easterEggCount: 0 })
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
      // 触发密码验证
      this.setData({ showAbout: false, showPwdDialog: true, easterEggCount: 0 })
      wx.showToast({ title: '🔓 发现隐藏入口', icon: 'none', duration: 1500 })
    } else if (count >= 3) {
      // 给点暗示
      wx.showToast({ title: `还差${5 - count}次`, icon: 'none', duration: 800 })
    }
  },

  onPwdInput(e) {
    this.setData({ pwdInput: e.detail.value })
  },

  verifyPassword() {
    const { pwdInput } = this.data
    if (pwdInput === ADMIN_PASSWORD) {
      this.setData({ showPwdDialog: false, pwdInput: '' })
      wx.showToast({ title: '✅ 验证通过', icon: 'success' })
      setTimeout(() => {
        wx.navigateTo({ url: '/pages/admin-bookings/admin-bookings' })
      }, 800)
    } else {
      wx.showToast({ title: '密码错误', icon: 'none' })
      this.setData({ pwdInput: '' })
    }
  },

  // ========== 弹窗控制 ==========
  closeWechatQR() {
    this.setData({ showWechatQR: false })
  },

  closeAbout() {
    this.setData({ showAbout: false, easterEggCount: 0 })
  },

  closePwd() {
    this.setData({ showPwdDialog: false, pwdInput: '' })
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
