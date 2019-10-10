// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    //  else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 路由跳转
   */
  redirectTo: function() {
    wx.navigateTo({
      url: '/pages/publish_course/publish_course',
    })
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  // login: function() {
  //   console.log(111)
  //   let that = this
  //   wx.login({
  //     success(res) {
  //       console.log(res)
  //       if (res.code) {
  //         //发起网络请求
  //         wx.request({
  //           url: 'http://192.168.3.17:8080/v1/login/wechat',
  //           data: {
  //             code: res.code
  //           },
  //           method: "POST",
  //           success: function(res) {
  //             app.globalData.accessToken = res.accessToken
  //             wx.getUserInfo({
  //               success: res => {
  //                 app.globalData.userInfo = res.userInfo
  //                 that.setData({
  //                   userInfo: res.userInfo,
  //                   hasUserInfo: true
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   })
  // },
  /**
   * 路由跳转到登录页面
   */
  toLogin: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  navigateTo: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
 })