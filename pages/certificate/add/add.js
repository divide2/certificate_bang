// pages/certificate/add/add.js
import api from '../../../api/api.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    type: 'add',
    certificate: {
      name: '',
      licensor: ''
    },
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.type === 'update') {
      this.getDetail(options.id)
      this.setData({
        type: options.type,
        id: options.id
      })
    }
  },
  ChooseImage() {
    let that = this
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
        // if (this.data.imgList.length != 0) {
        //   this.setData({
        //     imgList: this.data.imgList.concat(res.tempFilePaths)
        //   })
        // } else {
        //   this.setData({
        //     imgList: res.tempFilePaths
        //   })
        // }
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
      title: '删除',
      content: '确定要删除吗？',
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
  confirm: function(e) {
    let obj = e.detail.value
    obj.image = this.data.imgList[0]
    // wx.request({
    //   url: app.globalData.baseUrl + '/v1/org/certificates',
    //   data: obj,
    //   method: 'POST',
    //   header: {
    //     Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
    //   },
    //   success: function() {

    //   }
    // })
    if(this.data.type==='add') {
      this.addCer(obj)
    }else {
      this.updateCer(obj)
    }
   
  },
  getDetail(id) {
    api.get(`/v1/org/certificates/${id}`).then(data => {
      console.log(data)
      this.setData({
        certificate: data,
        imgList: [data.image]
      })
    }).catch(e=>{
      console.log(e)
    })
  },
  addCer(data) {
    api.post('/v1/org/certificates', data).then(data => {
      wx.navigateBack({
        delta: 1
      })
    })
  },
  updateCer(data) {
    api.put(`/v1/org/certificates/${this.data.id}`, data).then(data => {
      wx.navigateBack({
        delta: 1
      })
    })
  }
})