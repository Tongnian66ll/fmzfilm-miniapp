const mockData = require('../../utils/mockData')

Page({
  data: {
    categories: ['全部', '电影', '宣传片', 'TVC', '短片', '纪录片', 'AIGC', '短剧', '互动影游', '综艺'],
    activeCategory: '全部',
    cases: [],
    loading: true
  },

  onLoad() {
    this.loadCases()
  },

  onShow() {
    if (!this.data.loading) this.loadCases()
  },

  onPullDownRefresh() {
    this.loadCases().then(() => wx.stopPullDownRefresh())
  },

  async loadCases() {
    this.setData({ loading: true })
    try {
      const db = wx.cloud.database()
      let query = db.collection('cases')
      if (this.data.activeCategory !== '全部') {
        query = query.where({ category: this.data.activeCategory })
      }
      const res = await query.orderBy('sort', 'asc').limit(20).get()
      this.setData({ cases: res.data, loading: false })
    } catch (err) {
      let filtered = mockData.cases
      if (this.data.activeCategory !== '全部') {
        filtered = filtered.filter(c => c.category === this.data.activeCategory)
      }
      this.setData({ cases: filtered, loading: false })
    }
  },

  switchCategory(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({ activeCategory: cat })
    this.loadCases()
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/case-detail/case-detail?id=${id}` })
  }
})
