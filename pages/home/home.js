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
    swiperList: [
      {
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }],
    courses: [
      {
      image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      name: '消防员证书课程',
      tags: ['有证书', '认证机构'],
      address: '广东深圳',
      price: '1000',
      date: '2019-11-11'
    }, {
      image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      name: '消防员证书课程',
      tags: ['有证书', '认证机构'],
      address: '广东深圳',
      price: '1000',
      date: '2019-11-11',
    }],
  },

  ready() {
    this.setData({
      location: wx.getStorageSync('curCity')
    })
    this.getCourse()
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
        url: '/pages/course/detail/detail?id='+e.currentTarget.dataset.id
      })
    }
  }
})
