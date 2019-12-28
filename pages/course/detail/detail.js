// pages/course/course.js
import api from '../../../api/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: {},
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({id: options.id})
    api.get(`/v1/org/courses/${options.id}`).then(data => {
      this.setData({
        course: data
      })
      let article = data.details
      let WxParse = require('../../../wxParse/wxParse.js');
      WxParse.wxParse('article', 'html', article, that, 5)
    })
  },
  join() {
    api.post(`/v1/user/join/${this.data.id}`).then(data => {
      wx.showToast({
        title: '报名成功'
      })
      wx.redirectTo({url: '/pages/course/list/list'})
    })
  }
})