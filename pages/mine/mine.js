// pages/mine/mine.js
const app = getApp()
import {needLogin} from '../../utils/util'
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
  methods: {
    toLogin: function() {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },
    navigateTo: function(e) {
      needLogin().then(()=> {
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        })
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