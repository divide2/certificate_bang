//index.js
//获取应用实例
import api from "../../api/api";

const app = getApp()

Page({
  data: {
    pageCur: 'home',
    courses: [],
    last: false,
    query: {
      page: 0
    },
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
    this.getCourse();
  },
  navChange: function (e) {
    this.setData({
      pageCur: e.currentTarget.dataset.cur.key
    })
  },
  getCourse() {
    api.get('/v1/courses', this.data.query).then(data => {
      this.data.courses.push(...data.content);
      this.setData({
        last: data.last,
        courses: this.data.courses
      })
    })
  },
  onTabChange(e) {
    let data = e.detail
    data.page = 0
    this.setData({query: data});
    this.getCourse()
  },
  onReachBottom() {
    if (this.data.pageCur === 'course' && !this.data.last) {
      this.setData({'query.page': this.data.query.page + 1});
      this.getCourse();
    }
  }

})