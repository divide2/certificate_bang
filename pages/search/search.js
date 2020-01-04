// pages/search/search.js
import api from '../../api/api'

Component({

  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    courses: {
      type: Array
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    is_industy_fold: false,
    is_time_fold: false,
    is_certificate_fold: false,
    // todo 调整这里
    options: [{
      name: '全部类型',
      fold: false,
      list: [{
        checked: true,
        name: '全部类型',
        value: ''
      }, {
        name: '户外登山',
        value: '1'
      }, {
        name: '医疗急救',
        value: '2'
      }, {
        name: '救援技能',
        value: '3'
      }, {
        name: '社区街道',
        value: '4'
      }]
    }, {
      name: '全部费用',
      fold: false,
      list: [{
        checked: true,
        name: '全部费用',
        value: ''
      }, {
        name: '免费',
        value: 'true'
      }, {
        name: '收费',
        value: 'false'
      }]
    },
      {
        name: '全部证书',
        fold: false,
        list: [{
          checked: true,
          name: '全部证书',
          value: ''
        }, {
          name: '有证',
          value: 'true'
        }, {
          name: '无证',
          value: 'false'
        }]
      }
    ],
    /**
     * 当前过滤条件
     */
    cur_option_list_index: null,
    test_data: [{
      value: '1',
      name: '1',
      checked: true
    }, {
      value: '2',
      name: '3'
    }]
  },

  ready() {
  },
  methods: {

    /**
     * 点击过滤条件
     */
    clickOption: function (e) {
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
    selectOption: function (e) {
      let arrs = this.data.options[this.data.cur_option_list_index].list
      for (const option of arrs) {
        console.log(option.value, '000', e.detail.value)
        option.checked = option.value === e.detail.value
      }
      console.log('arrs', arrs);
      this.setData({
        [`options[${this.data.cur_option_list_index}].list`]: arrs
      })
      this.getOptionListName()
    },
    getOptionListName: function () {
      let arrs = this.data.options[this.data.cur_option_list_index].list
      let option = arrs.find((item) => item.checked)
      this.setData({
        [`options[${this.data.cur_option_list_index}].name`]: option.name
      })
      const hasCert = this.data.options[2].list.find(item => item.checked).value
      const free = this.data.options[1].list.find(item => item.checked).value
      const professionId = this.data.options[0].list.find(item => item.checked).value
      this.triggerEvent('tabchange', {hasCert, free, professionId})
    },
    toDetail(e) {
      wx.navigateTo(
        {url: `/pages/course/detail/detail?id=${e.currentTarget.id}`}
      )
    }
  }
})