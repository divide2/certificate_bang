//app.js
import api from './api/api.js'
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        api.get('/v1/address/city/resolve', { latitude: latitude, longitude: longitude }).then(res => {
          console.log(res)
        })
      }
    })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户同意之后可以获取经纬度
              wx.getLocation({
                type: 'gcj02',
                success: function (res) {
                  const latitude = res.latitude
                  const longitude = res.longitude
                  api.get('/v1/address/city/resolve',{latitude:latitude,longitude:longitude}).then(res=>{
                    wx.setStorageSync('curCity', res.city)
                  })
                }
              })
            }
          })
        }
      }
    })

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfor: null,
    accessToken: null,
    baseUrl: 'http://120.77.153.225:8080',
    tabBar: [{
      key: 'home',
      name: '首页',
      icon: 'home',
      curIcon: 'homefill',
      page: '/pages/index/index'
    }, {
      key: 'discover',
      name: '发现',
      icon: 'discover',
      curIcon: 'discoverfill',
      page: '/pages/index/index'
    }, {
      key: 'mine',
      name: '我的',
      icon: 'people',
      curIcon: 'peoplefill',
      page: '/pages/mine/mine'
    }]
  }
})