// pages/search/search.js
import api from '../../api/api'

Component({

  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    is_industy_fold: false,
    is_time_fold: false,
    is_certificate_fold: false,
    // todo 调整这里
    options: [{
      name: '行业选择',
      fold: false,
      list: [{
        checked: 'true',
        name: '全部',
        id: 0
      }, {
        name: '户外登山',
        id: 1
      }, {
        name: '医疗急救',
        id: 2
      }, {
        name: '救援技能',
        id: 3
      }, {
        name: '社区街道',
        id: 4
      }]
    }, {
      name: '费用选择',
      fold: false,
      list: [{
        checked: 'true',
        name: '全部',
        id: 0
      }, {
        name: '免费',
        id: 1
      }, {
        name: '收费',
        id: 2
      }]
    },
      {
        name: '证书选择',
        fold: false,
        list: [{
          checked: 'true',
          name: '全部',
          id: 0
        }, {
          name: '有证',
          id: 1
        }, {
          name: '无证',
          id: 2
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
    api.get('/v1/courses').then(data => {
      this.setData({
        courses: data.content
      })
    })
  },
  methods: {
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
    selectOption: function(e) {
      let arrs = this.data.options[this.data.cur_option_list_index].list
      for (const x in arrs) {
        if (arrs[x].id == e.detail.value) {
          arrs[x].checked = true
        } else {
          arrs[x].checked = false
        }
      }
      this.setData({
        [`options[${this.data.cur_option_list_index}].list`]: arrs
      })
      this.getOptionListName()
    },
    getOptionListName: function() {
      let arrs = this.data.options[this.data.cur_option_list_index].list
      let option = arrs.find((item) => item.checked === true)
      console.log(option)
      this.setData({
        [`options[${this.data.cur_option_list_index}].name`]: option.name
      })
    },
    toDetail(e) {
      wx.navigateTo(
        { url: `/pages/course/detail/detail?id=${e.currentTarget.id}` }
      )
    }
  }
})