// pages/login/orgRegister.js
const app = getApp()

Page({
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  },
  login: function (e) {
    let that = this
    /*  wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: app.globalData.baseUrl + '/v1/login/wechat',
              data: {
                code: res.code
              },
              method: "POST",
              fail() {
                console.log('xxx')
              },
              success: function (res) {
                wx.setStorageSync('accessToken', res.data.accessToken)
                wx.getUserInfo({
                  success: res => {
                    wx.request({
                      url: app.globalData.baseUrl + '/v1/user/wechat',
                      data: res.userInfo,
                      header: {
                        Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
                      },
                      method: 'POST',
                      success: function (res) {
                        wx.request({
                          url: app.globalData.baseUrl + '/v1/user',
                          header: {
                            Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
                          },
                          method: 'GET',
                          success: function (data) {
                            console.log('mess:', data)
                            app.globalData.userInfo = data.data
                            console.log(app.globalData.userInfo)
                            wx.setStorageSync('userInfo', data.data);
                            wx.navigateBack({})
                          }
                        })
                      }
                    })
                    // 返回上一页
                    wx.navigateTo({
                      url: that.data.backPage,
                    })
                  }
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })*/
  },
  toOrgLogin: function (e) {
    wx.navigateTo({url: '/pages/login/orgLogin/orgLogin'})
  },
  toOrgRegister() {
    wx.navigateTo({url:  '/pages/login/orgRegister/orgRegister'})
  }

})