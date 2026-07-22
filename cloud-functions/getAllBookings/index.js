const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const countRes = await db.collection('bookings').count()
    const total = countRes.total
    
    // 分批获取（云函数单次最多100条）
    const batchSize = 100
    let allData = []
    for (let i = 0; i < total; i += batchSize) {
      const res = await db.collection('bookings')
        .orderBy('createTime', 'desc')
        .skip(i)
        .limit(batchSize)
        .get()
      allData = allData.concat(res.data)
    }
    
    return { success: true, data: allData, total }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
