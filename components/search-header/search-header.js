Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    canGoToSearch: {
      type: Boolean,
      value: false
    }
  },
  data: {
    inputText: '',
    location:'深圳'
  },
  methods: {
    goToSearch: function() {
      console.log(this.properties.canGoToSearch)
      if (this.properties.canGoToSearch) {
        console.log(21)
        wx.redirectTo({
          url: '/pages/search/search',
        })
      }
    }
  }
})