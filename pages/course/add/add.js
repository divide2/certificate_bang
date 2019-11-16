// pages/publish_course/publish_course.js
import api from '../../../api/api.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    professionPicker: [],
    region: ['广东省', '深圳市', '南山区'],
    imgList: [],
    certificatePicker: ['无', '医疗急救', '救援技能', '社区街道'],
    startTime: "",
    endTime: "",
    certificate: {name: ''},
    profession: '',
    professionPickerIndex: null,
    editorContent: '',
    address:{
      address: '',
      latitude: '',
      longitude: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getProfession()
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
  getProfession() {
    api.get('/v1/professions').then(data => {
      this.setData({
        professionPicker: data
      })
    })
  },
  professionChange(e) {
    this.setData({
        index: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  certificateChange(e) {
    console.log(e)
  },
  confirm(e) {
    debugger
    let obj = e.detail.value
    obj.imgs = this.data.imgList
    // 测试数据
    obj.professionId = 
    obj.streets = 1
    obj.certificateId = this.data.certificate.id
    wx.request({
      url: app.globalData.baseUrl + '/v1/org/courses',
      data: obj,
      method: 'POST',
      header: {
        Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
      },
      success: function() {

      }
    })
  },
  startTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  endTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  toCer() {
    wx.navigateTo({
      url: '/pages/certificate/list/list',
    })
  },
  toCourseDetailEditor() {
    wx.navigateTo({
      url: '/pages/editor/editor',
    })
  },
  chooseAddress() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res
        })
      },
    })
  }
})