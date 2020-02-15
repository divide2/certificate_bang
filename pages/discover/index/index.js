import api from '../../../api/api'

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    articles: []
  },
  ready() {
    api.get('/v1/articles').then(data => {
      this.data.articles.push(...data.content)
      this.setData({
        articles: this.data.articles
      })
    })
  },
  methods: {
    toArticle(e) {
      wx.navigateTo({
        url: '/pages/discover/article/article?id='+e.currentTarget.id
      })
    }
  }
});
