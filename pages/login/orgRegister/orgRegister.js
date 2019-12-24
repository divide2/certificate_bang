// pages/login/orgRegister.js
const app = getApp()
import api from '../../../api/api.js'

Page({
  data: {
    imgList: [],
  },
  register: function (e) {
    let data = e.detail.value
    data.license = this.data.imgList[0]
    api.post('/v1/reg', data).then(res => {
      wx.navigateTo({url: '/pages/login/login'})
    }).catch(e => {
      wx.showToast({
        icon:"none",
        title: '请完善全部信息'
      })
    })
  },
  chooseImage() {
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
  viewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  delImg(e) {
    wx.showModal({
      title: '删除',
      content: '确认删除么？',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  }
})