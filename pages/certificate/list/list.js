// pages/certificatelist/certificatelist.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCertificates()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  toAddCer: function() {
    wx.navigateTo({
      url: '/pages/certificate/add/add?type=add',
    })
  },
  getCertificates: function() {
    api.get('/v1/org/certificates').then(data => {
      this.setData({
        list: data
      })
    })
  },
  toUpdateCer(e) {
    debugger
    console.log(e)
    wx.navigateTo({
      url: `/pages/certificate/add/add?type=update&id=${e.currentTarget.dataset.id}`
    })
  },
  deleteCer(e) {
    // todo 传输id
    api.remove(`/v1/org/certificates/${e.currentTarget.dataset.id}`).then(data=>{
      this.getCertificates()
    })
  }, 
  chooseCer(e) {
    let pages = getCurrentPages()
    let prevPage=pages[pages.length-2]
    prevPage.setData({
      certificate: e.currentTarget.dataset.item
    },function(){
      wx.navigateBack({
        delta: 1
      })
    })
  }
})