// pages/address/list/list.js
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
    this.getData()
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
  toAddAddress() {
    wx.navigateTo({
      url: '/pages/address/add/add?type=add',
    })
  },
  getData() {
    api.get('/v1/org/addresses').then(data => {
      this.setData({
        list:data
      })
    })
  },
  toUpdateAddress(e) {
    wx.navigateTo({
      url: `/pages/address/add/add?type=update&id=${e.currentTarget.dataset.id}`,
    })
  },
  deleteAddress(e) {
    api.remove(`/v1/address/${e.currentTarget.dataset.id}`).then(()=>{
      this.getData()
    })
  },
  chooseAddress(e) {
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      ['course.addressName']: e.currentTarget.dataset.item.address,
      ['course.addressId']: e.currentTarget.dataset.item.id
    }, function () {
      wx.navigateBack({
        delta: 1
      })
    })
  }
})