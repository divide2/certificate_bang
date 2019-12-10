// pages/login/login.js
const app = getApp()
import api  from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'default',
    organizationType: '',
    imgList: [],
    backPage: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.backPage) {
      this.setData({
        backPage: options.backPage + '?' + options.paramKey + '=' + options.paramValue
      })
    }
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  },
  login: function() {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.baseUrl + '/v1/login/wechat',
            data: {
              code: res.code
            },
            method: "POST",
            success: function(res) {
              wx.setStorageSync('accessToken', res.data.accessToken)
              wx.getUserInfo({
                success: res => {
                  wx.request({
                    url: app.globalData.baseUrl + '/v1/user/wechat',
                    data: res.userInfo,
                    header: {
                      Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
                    },
                    method: 'POST',
                    success: function(res) {
                      wx.request({
                        url: app.globalData.baseUrl + '/v1/user',
                        header: {
                          Authorization: 'Bearer ' + wx.getStorageSync('accessToken')
                        },
                        method: 'GET',
                        success: function(data) {
                          console.log('mess:', data)
                          app.globalData.userInfo = data.data
                          console.log(app.globalData.userInfo)
                          wx.setStorageSync('userInfo', data.data);
                          wx.navigateBack({

                          })
                        }
                      })
                    }
                  })
                  // 返回上一页
                  wx.navigateTo({
                    url: that.data.backPage,
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  selectOra: function(e) {
    console.log(e.currentTarget.dataset.organizationtype)
    this.setData({
      organizationType: e.currentTarget.dataset.organizationtype,
      type: e.currentTarget.dataset.organizationtype
    })
    console.log(this.organizationType)
  },
  register: function(e) {
    let data = e.detail.value
    data.license = this.data.imgList[0]
    wx.request({
      url: app.globalData.baseUrl + '/v1/reg',
      data: data,
      method: "POST",
      success: function(res) {

      }
    })
  },
  orLogin: function(e) {
    wx.showToast({
      title: 'shide',
    })
    let that = this
    api.post('/v1/login/org',e.detail.value).then(res=>{
      wx.showToast({
        title: 'org',
      })
      wx.setStorageSync('accessToken', res.accessToken)
      api.get('/v1/user').then(data => {
        wx.showToast({
          title: 'user',
        })
        app.globalData.userInfo = data
        console.log(app.globalData.userInfo)
        wx.setStorageSync('userInfo', data)
        //登录成功后跳转
        if (!!that.data.backPage) {
          // 返回上一页
          wx.navigateTo({
            url: that.data.backPage,
          })
        } else {
          let pages = getCurrentPages()
          let prevPage = pages[pages.length - 2]
          prevPage.setData({
            ['userInfo']: app.globalData.userInfo
          }, function () {
            wx.navigateBack({
              delta: 1
            })
          })
        }
      })
    })
    // wx.request({
    //   url: app.globalData.baseUrl + '/v1/login/org',
    //   data: e.detail.value,
    //   method: "POST",
    //   success: function(res) {
       
    //   }
    // })
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
  }
})