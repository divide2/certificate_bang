// pages/address/citys/citys.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    cities: [],
    originCity: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      originCity: wx.getStorageSync('originCity')
    })
    api.get('/v1/operate/cities').then(data => {
      this.setData({
        cities: data,
        list: data.map(item => item.firstLetter)
          .filter((item, index, arr) => arr.indexOf(item) === index)
          .sort((a, b) => a > b ? 1 : -1)
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let that = this
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
      that.setData({
        boxTop: res.top
      })
    }).exec()
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  chooseCity(e) {
    wx.setStorageSync('curCity', e.currentTarget.dataset.city)
    wx.redirectTo({url: '/pages/index/index'})
  },
//获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20)
      if (num > this.data.list.length-1) num = this.data.list.length-1
      this.setData({
        listCur: that.data.list[num]
      })
    }
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurId: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this
    let barHeight = this.data.barHeight
    let list = this.data.list
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight)
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
  }

})