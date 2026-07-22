const mockData = require('../../utils/mockData')
const { formatPrice } = require('../../utils/util')

Page({
  data: {
    services: [],
    addons: [],
    selectedService: null,
    quantity: 1,
    selectedAddons: [],
    totalPrice: 0,
    priceBreakdown: [],
    loading: true
  },

  onLoad() {
    this.loadQuoteConfig()
  },

  async loadQuoteConfig() {
    try {
      const db = wx.cloud.database()
      const res = await db.collection('quote_config').limit(1).get()
      if (res.data.length > 0) {
        const config = res.data[0]
        this.setData({
          services: config.services,
          addons: config.addons,
          loading: false
        })
        return
      }
    } catch (err) {
      console.log('使用默认报价配置')
    }
    // 使用默认配置
    this.setData({
      services: mockData.quoteConfig.services,
      addons: mockData.quoteConfig.addons,
      loading: false
    })
  },

  selectService(e) {
    const id = e.currentTarget.dataset.id
    const service = this.data.services.find(s => s.id === id)
    this.setData({
      selectedService: service,
      quantity: 1
    })
    this.calculate()
  },

  quantityChange(e) {
    const val = parseInt(e.detail.value) || 1
    this.setData({ quantity: Math.max(1, val) })
    this.calculate()
  },

  quantityAdd() {
    this.setData({ quantity: this.data.quantity + 1 })
    this.calculate()
  },

  quantityMinus() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 })
      this.calculate()
    }
  },

  toggleAddon(e) {
    const id = e.currentTarget.dataset.id
    const addons = this.data.selectedAddons
    const idx = addons.indexOf(id)
    if (idx > -1) {
      addons.splice(idx, 1)
    } else {
      addons.push(id)
    }
    this.setData({ selectedAddons: addons })
    this.calculate()
  },

  isAddonSelected(id) {
    return this.data.selectedAddons.includes(id)
  },

  calculate() {
    const { selectedService, quantity, addons } = this.data
    if (!selectedService) {
      this.setData({ totalPrice: 0, priceBreakdown: [] })
      return
    }

    let total = selectedService.basePrice * quantity
    let breakdown = [
      { label: `${selectedService.name}`, detail: `${formatPrice(selectedService.basePrice)} × ${quantity}${selectedService.unit}`, amount: total }
    ]

    // 附加服务
    addons.forEach(addonId => {
      const addon = this.data.addons.find(a => a.id === addonId)
      if (addon) {
        total += addon.price
        breakdown.push({
          label: addon.name,
          detail: `${formatPrice(addon.price)}/${addon.unit}`,
          amount: addon.price
        })
      }
    })

    this.setData({
      totalPrice: total,
      priceBreakdown: breakdown
    })
  },

  goBooking() {
    const svc = this.data.selectedService
    const addons = this.data.selectedAddons
    const params = encodeURIComponent(JSON.stringify({
      service: svc ? svc.name : '',
      quantity: this.data.quantity,
      addons: addons,
      estimatedPrice: this.data.totalPrice
    }))
    wx.navigateTo({ url: `/pages/booking/booking?quote=${params}` })
  },

  contactService() {
    wx.showModal({
      title: '联系客服',
      content: '添加微信：njfmz1\n或拨打小程序内客服',
      showCancel: true,
      confirmText: '复制微信号',
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({ data: 'njfmz1' })
        }
      }
    })
  }
})
