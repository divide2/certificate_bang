// pages/login/orgRegister.js
const app = getApp()
import api from '../../../api/api.js'
import WxValidate from "../../../utils/WxValidate";

Page({
  data: {
    imgList: [],
  },
  onLoad() {
    this.initValidate()
  },
  initValidate() {
    const rules = {
      username: {required: true, rangelength: [4, 20]},
      password: {required: true, rangelength: [6, 20]},
      contactUser: {required: true, rangelength: [1, 5]},
      contactWay: {required: true, tel: true},
      email: {required: true, email: true},
      address: {required: true, rangelength: [2, 100]},
      license: {required: true, url: true}
    }
    const message = {
      username: {required: '请填写账号', rangelength: '账号长度在4到20之间'},
      password: {required: '请填写密码', rangelength: '密码长度在6到20之间'},
      contactUser: {required: '请填写联系人', rangelength: '联系人长度在1到5之间'},
      contactWay: {required: '请填写手机号', tel: '请填写正确的手机号'},
      email: {required: '请填写邮箱', email: '请填写正确的邮箱'},
      address: {required: '请填写地址', rangelength: '地址长度在2到100'},
      license: {required: '请上传营业执照', url: '请上传营业执照'}
    }
    this.WxValidate = new WxValidate(rules, message);
  },
  register(e) {
    let data = e.detail.value
    data.license = this.data.imgList[0]
    if (!this.WxValidate.checkForm(data)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        icon: "none",
        title: error.msg
      })
      return
    }
    api.post('/v1/reg', data).then(res => {
      wx.navigateTo({url: '/pages/login/login'})
    }).catch(e => {
      wx.showToast({
        icon: "none",
        title: '请完善全部信息'
      })
    })
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        wx.uploadFile({
          url: `${app.globalData.baseUrl}/v1/upload/image`,
          filePath: res.tempFilePaths[0],
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