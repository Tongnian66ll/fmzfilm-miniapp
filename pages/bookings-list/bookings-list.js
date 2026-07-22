Page({
  data: {
    bookings: [],
    loading: true
  },

  onShow() {
    this.loadMyBookings()
  },

  loadMyBookings() {
    this.setData({ loading: true })
    try {
      const localBookings = wx.getStorageSync('myBookings') || []
      const bookings = localBookings.map(b => ({
        ...b,
        createTimeStr: this.formatTime(b.createTime)
      }))
      this.setData({ bookings, loading: false })
    } catch (e) {
      console.log('加载预约记录失败', e)
      this.setData({ loading: false })
    }
  },

  formatTime(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    const pad = n => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  },

  goBooking() {
    wx.navigateTo({ url: '/pages/booking/booking' })
  },

  copyWechat() {
    wx.setClipboardData({
      data: 'njfmz1',
      success: () => {
        wx.showToast({ title: '微信号已复制', icon: 'success' })
      }
    })
  }
})
