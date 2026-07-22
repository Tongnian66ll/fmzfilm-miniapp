const app = getApp()

// 管理员 openId 列表（可添加多个）
// 首次部署时请先在控制台查看自己的 openId 并添加到此处
const ADMIN_OPENIDS = []

Page({
  data: {
    bookings: [],
    filteredBookings: [],
    loading: true,
    isAdmin: false,
    filter: 'all',
    myOpenId: ''
  },

  async onLoad() {
    // 先获取当前用户 openId
    try {
      const openIdRes = await wx.cloud.callFunction({ name: 'getOpenId' })
      const myOpenId = openIdRes.result.openId
      this.setData({ myOpenId })

      // 检查是否是管理员
      const isAdmin = ADMIN_OPENIDS.length === 0 || ADMIN_OPENIDS.includes(myOpenId)
      this.setData({ isAdmin })

      if (isAdmin) {
        await this.loadBookings()
      } else {
        this.setData({ loading: false })
      }
    } catch (e) {
      console.error('获取openId失败', e)
      // 如果获取失败，默认允许查看（开发阶段）
      this.setData({ isAdmin: true })
      await this.loadBookings()
    }
  },

  async loadBookings() {
    this.setData({ loading: true })
    try {
      // 尝试调用云端 getAllBookings 函数
      const res = await wx.cloud.callFunction({
        name: 'getAllBookings',
        data: {}
      })
      if (res.result && res.result.success) {
        const bookings = (res.result.data || []).map(b => ({
          ...b,
          createTimeStr: this.formatTime(b.createTime)
        }))
        this.setData({ bookings, loading: false })
        this.applyFilter()
        return
      }
    } catch (e) {
      console.log('getAllBookings 云函数不可用，尝试直接查询', e)
    }

    // 回退：直接查询数据库（需要数据库权限允许）
    try {
      const db = wx.cloud.database()
      const res = await db.collection('bookings')
        .orderBy('createTime', 'desc')
        .limit(100)
        .get()
      const bookings = (res.data || []).map(b => ({
        ...b,
        createTimeStr: this.formatTime(b.createTime)
      }))
      this.setData({ bookings, loading: false })
      this.applyFilter()
    } catch (e2) {
      console.error('数据库查询也失败', e2)
      this.setData({ loading: false })
      wx.showToast({ title: '加载失败，请检查云函数部署', icon: 'none' })
    }
  },

  formatTime(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    const pad = n => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  },

  setFilter(e) {
    const filter = e.currentTarget.dataset.filter
    this.setData({ filter })
    this.applyFilter()
  },

  applyFilter() {
    const { bookings, filter } = this.data
    let filtered = bookings
    if (filter !== 'all') {
      filtered = bookings.filter(b => b.status === filter)
    }
    this.setData({ filteredBookings: filtered })
  },

  callPhone(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({ phoneNumber: phone })
  },

  showQuoteDetail(e) {
    const detail = e.currentTarget.dataset.detail
    try {
      const info = JSON.parse(detail)
      let msg = `服务：${info.service || ''}\n`
      if (info.duration) msg += `时长：${info.duration}分钟\n`
      if (info.planName) msg += `套餐：${info.planName}\n`
      if (info.quantity) msg += `数量：${info.quantity}\n`
      if (info.addons && info.addons.length > 0) {
        msg += `附加服务：${info.addons.map(a => a.name).join('、')}\n`
      }
      msg += `\n预估总价：¥${info.estimatedPrice || 0}`
      wx.showModal({
        title: '报价明细',
        content: msg,
        showCancel: false,
        confirmText: '知道了'
      })
    } catch (e) {
      wx.showModal({ title: '报价详情', content: detail, showCancel: false })
    }
  },

  async updateStatus(e) {
    const { id, status } = e.currentTarget.dataset
    const statusText = status === 'confirmed' ? '确认' : '标记完成'
    
    wx.showModal({
      title: '确认操作',
      content: `确定要${statusText}这条预约吗？`,
      success: async (res) => {
        if (!res.confirm) return
        
        try {
          // 先尝试用云函数更新
          await wx.cloud.callFunction({
            name: 'updateBookingStatus',
            data: { bookingId: id, status }
          })
        } catch (e) {
          console.log('云函数更新失败，直接更新数据库', e)
          try {
            const db = wx.cloud.database()
            await db.collection('bookings').doc(id).update({
              data: { status, updateTime: new Date() }
            })
          } catch (e2) {
            console.error('更新失败', e2)
            wx.showToast({ title: '更新失败', icon: 'none' })
            return
          }
        }

        wx.showToast({ title: '已' + statusText, icon: 'success' })
        // 刷新列表
        await this.loadBookings()
      }
    })
  }
})
