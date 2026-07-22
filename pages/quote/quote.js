const mockData = require('../../utils/mockData')

Page({
  data: {
    services: [],
    allAddons: {},
    serviceAddons: {},
    currentAddons: [],       // 当前服务适用的附加服务列表
    selectedService: null,
    duration: 1,             // 宣传片/TVC/短片的时长（分钟）
    selectedPlan: 'monthly', // 短视频代运营套餐
    quantity: 1,             // 短视频月数
    eventDurationType: 'half', // 活动纪录时长类型
    selectedAddons: [],      // 选中的附加服务ID列表
    addonQuantities: {},     // 附加服务的数量（如视频剪辑分钟数、额外演员数等）
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
          allAddons: config.allAddons,
          serviceAddons: config.serviceAddons,
          loading: false
        })
        return
      }
    } catch (err) {
      console.log('使用默认报价配置')
    }
    this.setData({
      services: mockData.quoteConfig.services,
      allAddons: mockData.quoteConfig.allAddons,
      serviceAddons: mockData.quoteConfig.serviceAddons,
      loading: false
    })
  },

  // 选择服务类型
  selectService(e) {
    const id = e.currentTarget.dataset.id
    const service = this.data.services.find(s => s.id === id)
    const addonIds = this.data.serviceAddons[id] || []
    const currentAddons = addonIds.map(aid => this.data.allAddons[aid]).filter(Boolean)

    this.setData({
      selectedService: service,
      currentAddons: currentAddons,
      selectedAddons: [],
      addonQuantities: {},
      duration: 1,
      quantity: 1,
      selectedPlan: 'monthly',
      eventDurationType: 'half'
    })
    this.calculate()
  },

  // 修改时长（宣传片/TVC/短片）
  durationChange(e) {
    const val = parseInt(e.detail.value) || 1
    this.setData({ duration: Math.max(1, val) })
    this.calculate()
  },

  durationAdd() {
    this.setData({ duration: this.data.duration + 1 })
    this.calculate()
  },

  durationMinus() {
    const min = (this.data.selectedService && this.data.selectedService.durationMin) || 1
    if (this.data.duration > min) {
      this.setData({ duration: this.data.duration - 1 })
      this.calculate()
    }
  },

  // 选择套餐（短视频代运营）
  selectPlan(e) {
    const planId = e.currentTarget.dataset.id
    this.setData({ selectedPlan: planId })
    this.calculate()
  },

  // 修改月数（短视频代运营）
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

  // 选择活动纪录时长类型
  selectEventDuration(e) {
    const type = e.currentTarget.dataset.type
    this.setData({ eventDurationType: type })
    this.calculate()
  },

  // 切换附加服务
  toggleAddon(e) {
    const id = e.currentTarget.dataset.id
    const selected = this.data.selectedAddons.slice()
    const idx = selected.indexOf(id)
    if (idx > -1) {
      selected.splice(idx, 1)
    } else {
      selected.push(id)
    }
    this.setData({ selectedAddons: selected })
    this.calculate()
  },

  // 修改附加服务数量
  addonQtyChange(e) {
    const { id } = e.currentTarget.dataset
    const val = parseInt(e.detail.value) || 0
    const quantities = { ...this.data.addonQuantities, [id]: Math.max(0, val) }
    this.setData({ addonQuantities: quantities })
    this.calculate()
  },

  addonQtyAdd(e) {
    const id = e.currentTarget.dataset.id
    const quantities = { ...this.data.addonQuantities }
    quantities[id] = (quantities[id] || 0) + 1
    this.setData({ addonQuantities: quantities })
    this.calculate()
  },

  addonQtyMinus(e) {
    const id = e.currentTarget.dataset.id
    const quantities = { ...this.data.addonQuantities }
    if ((quantities[id] || 0) > 0) {
      quantities[id] = quantities[id] - 1
      this.setData({ addonQuantities: quantities })
      this.calculate()
    }
  },

  // 计算报价
  calculate() {
    const { selectedService } = this.data
    if (!selectedService) {
      this.setData({ totalPrice: 0, priceBreakdown: [] })
      return
    }

    let total = 0
    const breakdown = []
    const sid = selectedService.id

    // ===== 基础价格计算 =====
    if (sid === 'propaganda' || sid === 'tvc') {
      // 宣传片/TVC: 起拍价 + (时长-1) × 每分钟价格
      const dur = this.data.duration
      const baseTotal = selectedService.basePrice * dur
      total += baseTotal
      breakdown.push({
        label: selectedService.name,
        detail: dur === 1
          ? `起拍价 ¥${selectedService.basePrice}`
          : `¥${selectedService.basePrice} × ${dur}分钟`,
        amount: baseTotal
      })
    } else if (sid === 'short-video') {
      // 短视频代运营: 套餐单价 × 月数
      const plan = selectedService.plans.find(p => p.id === this.data.selectedPlan)
      const months = this.data.quantity
      const baseTotal = plan.price * months
      total += baseTotal
      breakdown.push({
        label: selectedService.name + ' - ' + plan.name,
        detail: `¥${plan.price}/月 × ${months}个月 · ${plan.desc}`,
        amount: baseTotal
      })
    } else if (sid === 'event') {
      // 活动纪录: 4小时或一天
      const opt = selectedService.durationOptions.find(o => o.id === this.data.eventDurationType)
      total += opt.price
      breakdown.push({
        label: selectedService.name,
        detail: opt.name,
        amount: opt.price
      })
    } else if (sid === 'short-film') {
      // 短片: 阶梯定价
      const dur = Math.max(1, this.data.duration)
      let filmPrice = 0
      let filmDetail = ''
      if (dur <= 5) {
        filmPrice = 8000
        filmDetail = '5分钟内起拍'
      } else if (dur <= 20) {
        filmPrice = 8000 + 1200 * (dur - 5)
        filmDetail = `5分钟内 ¥8000 + ${dur - 5}分钟 × ¥1200`
      } else {
        filmPrice = 8000 + 1200 * 15 + 1000 * (dur - 20)
        filmDetail = `5分钟内 ¥8000 + 15分钟 × ¥1200 + ${dur - 20}分钟 × ¥1000`
      }
      total += filmPrice
      breakdown.push({
        label: selectedService.name,
        detail: filmDetail,
        amount: filmPrice
      })
    }

    // ===== 附加服务计算 =====
    this.data.selectedAddons.forEach(addonId => {
      const addon = this.data.allAddons[addonId]
      if (!addon) return
      const qty = this.data.addonQuantities[addonId] || 0

      if (addon.pricingType === 'fixed') {
        // 固定价格
        total += addon.price
        breakdown.push({ label: addon.name, detail: `¥${addon.price}/${addon.unit}`, amount: addon.price })

      } else if (addon.pricingType === 'perQuantity') {
        // 按主服务数量计费（如投流盯盘按月数）
        const q = this.data.quantity || 1
        const amount = addon.price * q
        total += amount
        let detail = `¥${addon.price}/${addon.unit} × ${q}${addon.unit}`
        if (addon.note) detail += '（' + addon.note + '）'
        breakdown.push({ label: addon.name, detail: detail, amount: amount })

      } else if (addon.pricingType === 'perAddonQty') {
        // 按附加服务自身数量计费（如视频剪辑分钟数、原创音乐分钟数）
        const amount = addon.price * qty
        total += amount
        breakdown.push({ label: addon.name, detail: `¥${addon.price}/${addon.unit} × ${qty}${addon.unit}`, amount: amount })

      } else if (addon.pricingType === 'threshold') {
        // 阈值计费（如额外演员超过5人、额外场景超过4个）
        const overCount = Math.max(0, qty - addon.threshold)
        const amount = overCount * addon.price
        total += amount
        let detail = ''
        if (qty > 0) {
          detail = `${qty}${addon.unit}，超出${addon.threshold}的部分: ${overCount} × ¥${addon.price}`
          if (addon.note) detail += '（' + addon.note + '）'
        } else {
          detail = addon.note || ''
        }
        breakdown.push({ label: addon.name, detail: detail, amount: amount })

      } else if (addon.pricingType === 'custom') {
        // 自定义价格，不计入总价
        breakdown.push({ label: addon.name, detail: addon.note || '费用另算', amount: 0 })
      }
    })

    this.setData({ totalPrice: total, priceBreakdown: breakdown })
  },

  // 立即预约
  goBooking() {
    const svc = this.data.selectedService
    const addons = this.data.selectedAddons
    const params = encodeURIComponent(JSON.stringify({
      service: svc ? svc.name : '',
      quantity: this.data.quantity,
      duration: this.data.duration,
      addons: addons,
      estimatedPrice: this.data.totalPrice
    }))
    wx.navigateTo({ url: '/pages/booking/booking?quote=' + params })
  },

  // 联系客服
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
