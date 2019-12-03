Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    canGoToSearch: {
      type: Boolean,
      value: false
    },
    showLocation: {
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
        wx.navigateTo({
          url: '/pages/search/search',
        })
      }
    },
    chooseAddress() {
      wx.navigateTo({
        url: '/pages/address/citys/citys',
      })
    }
  },
  attached() {
    console.log(11)
  }
})