// 管理员权限控制
// 部署后将你的 openId 添加到 ADMIN_OPENIDS 数组中
// 获取方式：在小程序控制台运行 wx.cloud.callFunction({name:'getOpenId'}) 查看返回结果
const ADMIN_OPENIDS = []

async function isAdmin() {
  try {
    const res = await wx.cloud.callFunction({ name: 'getOpenId' })
    const openId = res.result.openId
    // 未配置管理员列表时，默认所有人都是管理员（开发阶段）
    // 配置后只有列表中的 openId 才有管理权限
    return ADMIN_OPENIDS.length === 0 || ADMIN_OPENIDS.includes(openId)
  } catch (e) {
    console.log('获取openId失败，默认允许访问', e)
    return true
  }
}

module.exports = { isAdmin, ADMIN_OPENIDS }
