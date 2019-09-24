// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [{
      image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      name: '消防员证书课程',
      tags: ['有证书', '认证机构'],
      address: '广东深圳',
      price: '1000',
      date: '2019-11-11'
    }, {
      image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      name: '消防员证书课程',
      tags: ['有证书', '认证机构'],
      address: '广东深圳',
      price: '1000',
      date: '2019-11-11'
    }],
    is_industy_fold: false,
    is_time_fold: false,
    is_certificate_fold: false,
    options: [{
        name: '行业选择',
        fold: false,
        list: [{
          checked: 'true',
          name: '全部',
          id: 9
        }, {
          name: '户外登山',
          id: 0
        }, {
          name: '医疗急救',
          id: 1
        }, {
          name: '救援技能',
          id: 2
        }, {
          name: '社区街道',
          id: 3
        }]
      }, {
        name: '费用选择',
        fold: false,
        list: [{
          checked: 'true',
          name: '全部',
          id: 9
        }, {
          name: '免费',
          id: 0
        }, {
          name: '收费',
          id: 1
        }]
      },
      {
        name: '证书选择',
        fold: false,
        list: [{
          checked: 'true',
          name: '全部',
          id: 9
        }, {
          name: '有证',
          id: 0
        }, {
          name: '无证',
          id: 1
        }]
      }
    ],
    /**
     * 当前过滤条件
     */
    cur_option_list_index: null,
    test_data:[{
      value: '1',
      name: '1',
      checked: true
    }, {
        value: '2',
        name: '3'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  /**
   * 点击过滤条件
   */
  clickOption: function(e) {
    let index = e.currentTarget.dataset.index
    if (this.data.cur_option_list_index || this.data.cur_option_list_index === 0) { // 正打开其他option_list
      if (this.data.cur_option_list_index === index) { // 点击当前option_list
        this.setData({ // 关闭当前option_list
          [`options[${this.data.cur_option_list_index}].fold`]: false,
          cur_option_list_index: null
        })
      } else { // 点击其他option_list
        this.setData({
          [`options[${this.data.cur_option_list_index}].fold`]: false,
          cur_option_list_index: index,
          [`options[${index}].fold`]: true
        })
      }
    } else { // 新打开option_list
      this.setData({
        cur_option_list_index: index,
        [`options[${index}].fold`]: true
      })
    }
  },
  selectOption: function() {

  }
})