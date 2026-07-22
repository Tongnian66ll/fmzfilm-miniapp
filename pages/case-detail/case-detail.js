const mockData = require('../../utils/mockData')

Page({
  data: {
    caseItem: null,
    currentImageIndex: 0,
    loading: true
  },

  onLoad(options) {
    if (options.id) {
      this.loadCaseDetail(options.id)
    }
  },

  async loadCaseDetail(id) {
    try {
      const db = wx.cloud.database()
      const res = await db.collection('cases').doc(id).get()
      this.setData({ caseItem: res.data, loading: false })
    } catch (err) {
      // 从默认数据中查找
      const found = mockData.cases.find(c => c._id === id)
      if (found) {
        this.setData({ caseItem: found, loading: false })
      } else {
        wx.showToast({ title: '案例不存在', icon: 'none' })
        setTimeout(() => wx.navigateBack(), 1500)
      }
    }
  },

  previewImage(e) {
    const url = e.currentTarget.dataset.url
    if (this.data.caseItem && this.data.caseItem.images) {
      wx.previewImage({
        current: url,
        urls: this.data.caseItem.images
      })
    }
  },

  swiperChange(e) {
    this.setData({ currentImageIndex: e.detail.current })
  },

  onShareAppMessage() {
    const item = this.data.caseItem
    return {
      title: item ? item.title : '分秒帧影视',
      path: `/pages/case-detail/case-detail?id=${item._id}`,
      imageUrl: item ? item.coverUrl : ''
    }
  }
})
