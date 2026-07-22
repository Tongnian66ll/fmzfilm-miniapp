const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await db.collection('bookings').add({
      data: {
        _openid: wxContext.OPENID,
        name: event.name || '',
        phone: event.phone || '',
        serviceType: event.serviceType || '',
        budget: event.budget || '',
        description: event.description || '',
        estimatedPrice: event.estimatedPrice || null,
        quoteDetail: event.quoteDetail || '',
        status: 'pending',
        createTime: db.serverDate(),
        updateTime: db.serverDate()
      }
    })
    return { success: true, id: result._id }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
