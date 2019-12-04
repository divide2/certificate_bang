// pages/address/add/add.js
import api from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'add',
    id:'',
    addressObj: {
      address: '',
      longitude:'',
      latitude: '',
      detail: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    },()=>{
      if (this.data.type === 'update') { //修改
        this.setData({
          id: options.id
        })
        this.getDetail(options.id)
      }
    })
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
  chooseAddress() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          ['addressObj.address']: res.address,
          ['addressObj.longitude']: res.longitude,
          ['addressObj.latitude']: res.latitude,
        })
      }
    })
  },
  confirm() {
    if(this.data.type==='add'){
      api.post('/v1/address', this.data.addressObj).then(data => {
        wx.navigateBack({
          delta: 1
        })
      })
    }else{
      api.put(`/v1/address/${this.data.id}`, this.data.addressObj).then(data => {
        wx.navigateBack({
          delta: 1
        })
      })
    }
  },
  inputAddress(e) {
    let dataset = e.currentTarget.dataset
    this.setData({
      [`addressObj.${dataset.key}`]: e.detail.value
    })
  },
  getDetail(id) {
    api.get(`/v1/address/${id}`).then(data=>{
      this.setData({
        addressObj: data
      })
    })
  }
})