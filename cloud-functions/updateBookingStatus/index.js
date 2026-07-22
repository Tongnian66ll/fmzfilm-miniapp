const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { bookingId, status } = event
  try {
    await db.collection('bookings').doc(bookingId).update({
      data: {
        status,
        updateTime: db.serverDate()
      }
    })
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
