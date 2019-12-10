// pages/mine/mine.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  properties: {
    userInfo: {
      type: Object
    },
    hasUserInfo: {
      type: Boolean
    }
  },
  created: function() {
    // console.log(111)
    // console.log('1111', app.globalData.userInfo)
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    //   console.log(this.data.userInfo)
    // }
  },
  attached: function() {
    console.log('attached')
    // 在组件实例进入页面节点树时执行
  },
  ready: function() {
    // console.log('ready')
    // debugger
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    //   console.log(this.data.userInfo)
    // }
  },
  detached: function() {
    console.log('detached')
    // 在组件实例被从页面节点树移除时执行
  },
  moved: function() {
    console.log('moved')
  },
  error: function() {
    console.log('error')
  },
  methods: {
    toLogin: function() {
      wx.navigateTo({
        url: '/pages/login/login?backPage=/pages/index/index&paramKey=curPage&paramValue=mine',
      })
    },
    navigateTo: function(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    logout: function() { //退出
      wx.request({
        url: app.globalData.baseUrl + '/v1/logout',
        header: {
          Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          wx.clearStorage()
          wx.navigateTo({
            url: '/pages/index/index?curPage=mine',
          })
        }
      })
    }
  }
})