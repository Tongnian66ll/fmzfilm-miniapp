const mockData = require('../../utils/mockData')

Page({
  data: {
    bannerTitle: '以帧为尺，以秒为度',
    bannerSubtitle: '分秒帧影视有限公司',
    stats: [
      { value: '50+', label: '影视项目经验' },
      { value: '18', label: '项电影节入围' },
      { value: '全流程', label: '制作能力' },
      { value: '100+', label: '剧本保障' }
    ],
    featuredCases: [],
    loading: true
  },

  onLoad() {
    this.loadFeaturedCases()
  },

  async loadFeaturedCases() {
    try {
      const db = wx.cloud.database()
      const res = await db.collection('cases')
        .where({ featured: true })
        .orderBy('sort', 'asc')
        .limit(3)
        .get()
      this.setData({ featuredCases: res.data, loading: false })
    } catch (err) {
      this.setData({
        featuredCases: mockData.cases.slice(0, 3),
        loading: false
      })
    }
  },

  goCaseDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/case-detail/case-detail?id=${id}` })
  },

  goCases() {
    wx.switchTab({ url: '/pages/cases/cases' })
  },

  goQuote() {
    wx.switchTab({ url: '/pages/quote/quote' })
  },

  goBooking() {
    wx.navigateTo({ url: '/pages/booking/booking' })
  },

  onShareAppMessage() {
    return {
      title: '分秒帧影视 - 专业影视制作',
      path: '/pages/index/index',
      imageUrl: '/images/share-cover.jpg'
    }
  }
})
