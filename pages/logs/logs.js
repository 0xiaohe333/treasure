// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    user:[]
  },
  onLoad() {
    this.setData({
      user:wx.getStorageSync('userid')
    })
  },
  denglu(){
    wx.navigateTo({
      url: '/pages/表格/表格'
    })
  }
})
