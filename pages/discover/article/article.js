import api from '../../../api/api'
Page({
  data: {
    article: {}
  },
  onLoad(options) {
    let that = this
    let WxParse = require('../../../wxParse/wxParse.js');
    api.get(`/v1/articles/${options.id}`).then(data => {
      this.setData({
        article: data
      })
      console.log(data.content)
      WxParse.wxParse('content', 'html', data.content, that, 5)
    })
  }
})