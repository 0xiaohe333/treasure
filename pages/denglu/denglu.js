// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    number:'',
    account:'',
    password:'',
    user:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
  save(){
    console.log("保存")
    wx.request({
      url: 'http://101.35.249.68/my.php/',
      data:{
        action:"read",
        account:this.data.account,
        password:this.data.password,
      },
      method:'GET',
      success:(res2)=>{
        method:'GET',
        this.setData({
          user:res2.data
        })
        wx.setStorageSync('userid', res2.data)
        wx.showToast({
          title: '登陆成功',
        });
        wx.navigateBack();
      }
    })
  },
  /*获取账号*/
  account(e){
    console.log("获取账号", e.detail.value)
    this.setData({
      account:e.detail.value
    })
  },
  password(e){
    console.log("获取密码", e.detail.value)
    this.setData({
      password:e.detail.value
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})