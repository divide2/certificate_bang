//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageCur: 'home',
    tabBar: [{
      key: 'home',
      name: '首页',
      icon: 'home',
      curIcon: 'homefill'
    }, {
      key: 'course',
      name: '课程',
      icon: 'activity',
      curIcon: 'activityfill'
    }, {
      key: 'discover',
      name: '发现',
      icon: 'discover',
      curIcon: 'discoverfill'
    }, {
      key: 'mine',
      name: '我的',
      icon: 'people',
      curIcon: 'peoplefill'
    }],
    hasUserInfo: false,
    userInfo: {}
  },
  onLoad: function (options) {
    if (options.curPage) {
      this.setData({
        pageCur: options.curPage
      })
    }
  },
  navChange: function (e) {
    this.setData({
      pageCur: e.currentTarget.dataset.cur.key
    })
  }
})