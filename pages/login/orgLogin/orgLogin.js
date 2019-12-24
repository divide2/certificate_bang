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
  login(e) {
    api.post('/v1/login/org', e.detail.value).then(res => {
      wx.setStorageSync('accessToken', res.accessToken)
      api.get('/v1/user').then(data => {
        app.globalData.userInfo = data
        wx.setStorageSync('userInfo', data)
        //登录成功后跳转
        wx.showToast({
          title: '登录成功',
        })
        wx.navigateTo({url: '/pages/index/index?curPage=mine'})
      })
    }).catch(e => {
      wx.showToast({
        icon: 'none',
        title: '用户名或密码错误',
      })
    })
  },
})