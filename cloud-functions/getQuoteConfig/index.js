const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const res = await db.collection('quote_config').limit(1).get()
    if (res.data.length > 0) {
      return { success: true, data: res.data[0] }
    }
    return { success: true, data: null }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
