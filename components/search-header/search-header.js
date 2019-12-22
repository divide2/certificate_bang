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
      if (this.properties.canGoToSearch) {
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