const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const needLogin = () => {
  const userInfo = wx.getStorageSync('userInfo')
  return new Promise((resolve, reject) => {
    if (userInfo) {
      resolve(userInfo);
    } else {
      wx.navigateTo({url: '/pages/login/login'})
      reject()
    }
  })

}

module.exports = {
  formatTime: formatTime,
  needLogin
}
