// pages/login/orgRegister.js
const app = getApp()
import api from '../../../api/api.js'

Page({
  data: {
    form: {
      username: '',
      password: ''
    }
  },
  login: function (e) {
    let that = this
    api.post('/v1/login/org', e.detail.value).then(res => {
      wx.setStorageSync('accessToken', res.accessToken)
      api.get('/v1/user').then(data => {
        app.globalData.userInfo = data
        wx.setStorageSync('userInfo', data)
        //登录成功后跳转
        wx.showToast({
          title: '登录成功',
        })
        if (!!that.data.backPage) {
          // 返回上一页
          wx.navigateTo({
            url: that.data.backPage,
          })
        } else {
          let pages = getCurrentPages()
          let prevPage = pages[pages.length - 2]
          prevPage.setData({
            ['userInfo']: app.globalData.userInfo
          }, function () {
            wx.navigateBack({
              delta: 1
            })
          })
        }
      }).catch(e => {
        wx.showToast({
          title: '用户名或密码错误',
        })
      })
    })
  },
})