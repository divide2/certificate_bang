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
    userInfo: {},

  },
  ready() {
    const userInfo = wx.getStorageSync('userInfo')

    this.setData({
      userInfo: userInfo,
      isOrg: userInfo.type === 'ORG',
      isUser: userInfo.type === 'USER'
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
      wx.navigateTo({
        url: '/pages/mine/editSelf/editSelf'
      })
    },
    logout: function () { //退出
      wx.request({
        url: app.globalData.baseUrl + '/v1/logout',
        header: {
          Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
        },
        method: 'POST',
        success: function (res) {
          wx.removeStorageSync('userInfo')
          wx.redirectTo({
            url: '/pages/index/index?curPage=mine'
          })
        }
      })
    }
  }
})