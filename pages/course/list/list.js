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
    courses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
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
  tabSelect(e) {
    console.log(e);
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    this.getData()
  },
  getData() {
    // todo 需要加上参数
    api.get('/v1/user/joined').then(data=>{
      this.setData({
        courses: data.content
      })
    })
  }
})