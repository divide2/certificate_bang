// pages/home/home.js
import api from '../../api/api.js'
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    app: app.globalData,
    cardCur: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sliders: [],
    courses: [],
  },

  ready() {
    this.setData({
      location: wx.getStorageSync('curCity')
    })
    this.getCourse()
    this.getSlider()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getSlider() {
      api.get('/v1/sliders').then(data => {
        this.setData({
          sliders: data.content
        })
      })
    },
    getCourse() {
      api.get('/v1/courses').then(data => {
        this.setData({
          courses: data.content
        })
      })
    },
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    toCourse(e) {
      wx.navigateTo({
        url: '/pages/course/detail/detail?id='+e.currentTarget.id
      })
    },
    toLink(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.link
      })
    }
  }
})
