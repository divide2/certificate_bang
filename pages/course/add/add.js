// pages/publish_course/publish_course.js
import api from '../../../api/api.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    professionPicker: [],
    course:{
      name: '', // 名字
      price: '', // 价格
      addressName: '', // 地址名字
      addressId: '', // 地址id
      description: '', // 课程描述
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      certificateId: '', // 证书id
      certificateName: '', // 证书名字
      arrangement: '', //buzhi
      images: [], // 图片
      details: '', // 图文描述
      professionId: '', // 行业id
      professionName: '' // 行业名字
    },
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
      ['course.professionName']: this.data.professionPicker[e.detail.value].name,
      ['course.professionId']: this.data.professionPicker[e.detail.value].id
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        wx.uploadFile({
          url: `${app.globalData.baseUrl}/v1/upload/image`,
          filePath: res.tempFilePaths[0],
          header: {
            Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
          },
          name: 'file',
          success(res) {
            that.setData({
              imgList: [res.data]
            })
          }
        })
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.course.images,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除',
      content: '确定要删除吗？',
      success: res => {
        if (res.confirm) {
          this.data.course.images.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            ['course.images']: this.data.course.images
          })
        }
      }
    })
  },
  confirm(e) {
    wx.request({
      url: app.globalData.baseUrl + '/v1/org/courses',
      data: this.data.course,
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
      ['course.startTime']: e.detail.value
    })
  },
  endTimeChange(e) {
    this.setData({
      ['course.endTime']: e.detail.value
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
    // let that = this
    // wx.chooseLocation({
    //   success: function (res) {
    //     that.setData({
    //       address: res
    //     })
    //   },
    // })
    // 跳转去地址管理
    wx.navigateTo({
      url: '/pages/address/list/list'
    })
  },
  inputCourse(e) {
    console.log(`course.${e.currentTarget.dataset.key}`)
    console.log(e.detail.value)
    this.setData({
      [`course.${e.currentTarget.dataset.key}`]: e.detail.value
    })
  }
})