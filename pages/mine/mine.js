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
    userInfo: {}
  },
  ready() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  methods: {
    toLogin: function () {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },
    navigateTo: function (e) {
      needLogin().then(() => {
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        })
      })
    },
    toEditSelf() {

    },
    logout: function () { //退出
      wx.request({
        url: app.globalData.baseUrl + '/v1/logout',
        header: {
          Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          wx.clearStorage()
          wx.redirectTo({
            url: '/pages/index/index?curPage=mine'
          })
        }
      })
    }
  }
})