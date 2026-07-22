const formatTime = date => {
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

const formatPrice = price => {
  if (price === null || price === undefined) return '面议'
  return '¥' + price.toLocaleString()
}

// 从云数据库获取数据
const getCollection = (name, query = {}) => {
  const db = wx.cloud.database()
  let col = db.collection(name)
  if (query.where) col = col.where(query.where)
  if (query.orderBy) col = col.orderBy(query.orderBy[0], query.orderBy[1] || 'desc')
  if (query.limit) col = col.limit(query.limit)
  if (query.skip) col = col.skip(query.skip)
  return col.get()
}

module.exports = { formatTime, formatPrice, getCollection }
