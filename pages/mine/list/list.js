// pages/courselist/courselist.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNav: [{
      id: 0,
      value: '未开始'
    }, {
      id: 1,
      value: '进行中'
    }, {
      id: 2,
      value: '已完成'
    }],
    tabCur: 0,
    courses: [],
    query: {
      page: 0
    },
    last: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCourse()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    this.getCourse()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.data.last) {
      this.setData({ 'query.page': this.data.query.page + 1 });
      this.getCourse();
    }
  },
  getCourse(data) {
    api.get('/v1/user/joined', this.data.query).then(data => {
      this.data.courses.push(...data.content);
      this.setData({
        last: data.last,
        courses: this.data.courses
      })
    })
  }
})