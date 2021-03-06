const app = getApp()
const request = (url, options) => {
  return new Promise((resolve, reject) => {
    let baseUrl = app &&app.globalData&&app.globalData.baseUrl ? app.globalData.baseUrl : 'http://120.77.153.225:8080'
    wx.request({
      url: `${baseUrl}${url}`,
      method: options.method,
      data: options.data,
      header: {
        Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
      },
      success(req) {
        console.log(req)
        if (req.statusCode >= 200 && req.statusCode < 300) {
          resolve(req.data)
        } else if (req.statusCode===403) {
          //token过期需重新登录
          wx.removeStorageSync('userInfo')
          wx.redirectTo({
            url: '/pages/login/login'
          })
          reject(req)
        } else{
          reject(req)
        }
      },
      fail(error) {
        reject(error)
       // todo 报错信息
       console.error(error)
      }
    })
  })
}

const get = (url, options = {}) => {
  return request(url, {
    method: 'GET',
    data: options
  })
}

const post = (url, options) => {
  return request(url, {
    method: 'POST',
    data: options
  })
}

const put = (url, options) => {
  return request(url, {
    method: 'PUT',
    data: options
  })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  return request(url, {
    method: 'DELETE',
    data: options
  })
}

module.exports = {
  get,
  post,
  put,
  remove
}