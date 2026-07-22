const app = getApp()

Page({
  data: {
    name: '', phone: '', serviceType: '', budget: '', description: '',
    quoteInfo: null, submitting: false,
    serviceOptions: ['宣传片', 'TVC广告', '短视频代运营', '活动纪录', '短片/微电影', '其他']
  },

  onLoad(options) {
    if (options.quote) {
      try {
        const info = JSON.parse(decodeURIComponent(options.quote))
        this.setData({ quoteInfo: info, serviceType: info.service || '' })
      } catch (e) {}
    }
  },

  onInputName(e) { this.setData({ name: e.detail.value }) },
  onInputPhone(e) { this.setData({ phone: e.detail.value }) },
  onInputBudget(e) { this.setData({ budget: e.detail.value }) },
  onInputDesc(e) { this.setData({ description: e.detail.value }) },
  onServiceChange(e) { this.setData({ serviceType: this.data.serviceOptions[e.detail.value] }) },

  copyWechat() {
    wx.setClipboardData({
      data: 'njfmz1',
      success: () => wx.showToast({ title: '微信号已复制，打开微信添加', icon: 'success' })
    })
  },

  async submitBooking() {
    const { name, phone, serviceType, budget, description, quoteInfo } = this.data
    if (!name.trim()) { wx.showToast({ title: '请输入姓名', icon: 'none' }); return }
    if (!phone.trim() || !/^1\d{10}$/.test(phone)) { wx.showToast({ title: '请输入正确的手机号', icon: 'none' }); return }
    if (!serviceType) { wx.showToast({ title: '请选择服务类型', icon: 'none' }); return }

    this.setData({ submitting: true })
    try {
      await wx.cloud.callFunction({
        name: 'createBooking',
        data: {
          name: name.trim(), phone: phone.trim(), serviceType,
          budget: budget.trim(), description: description.trim(),
          estimatedPrice: quoteInfo ? quoteInfo.estimatedPrice : null,
          quoteDetail: quoteInfo ? JSON.stringify(quoteInfo) : '',
          createTime: new Date()
        }
      })
      wx.showToast({ title: '提交成功', icon: 'success' })
      setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 1500)
    } catch (err) {
      wx.showToast({ title: '提交失败，请稍后重试', icon: 'none' })
    }
    this.setData({ submitting: false })
  }
})
