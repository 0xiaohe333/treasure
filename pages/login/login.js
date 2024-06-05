//index.js
Page({
  data: {
    account:'',
    password:'',
    user:[],
    clientHeight:''
  },
  onLoad(){
    var that=this
    wx.getSystemInfo({ 
      success: function (res) { 
        console.log(res.windowHeight)
          that.setData({ 
              clientHeight:res.windowHeight
        }); 
      } 
    }) 
  },
  // //协议
  // goxieyi(){
  //  wx.navigateTo({
  //    url: '/pages/oppoint/oppoint',
  //  })
  // },
  //获取输入款内容
  content(e){
    this.setData({
      account:e.detail.value
    });  
  },
  password(e){
    this.setData({
      password:e.detail.value
    });  
  },
  //登录事件

  //1.index永远是-1；
  getUserIndexByAccount: function(account) {
    if (!Array.isArray(this.data.user)) {
      console.log(this.data.user);
      return -1; // 用于判断user数组是否成功赋值
    }
    return this.data.user.findIndex(user => user.account === account);
  },
  

  goadmin() {
    const account = this.data.account;
    const password = this.data.password;
  
    if (!account || !password) {
      wx.showToast({
        icon: 'none',
        title: '账号或密码不能为空',
      });
      return;
    }
  
    wx.request({
      url: 'http://101.35.249.68/my.php/',
      data:{
        action:"read",
        account:this.data.account,
        password:this.data.password,
      },
      method: 'GET', 
      success: (res2) => {
          this.setData({
            user: res2.data, 
          });
  //找一个办法更新user的值
          var index = this.getUserIndexByAccount(account);
          if (index !== -1) {
            if (password !== this.data.user[index].password) {
              wx.showToast({
                title: '密码错误！！',
                icon: 'error',
                duration: 2500,
              });
            } else {
              // user[index]有一个id属性，用于存储用户ID
              wx.setStorageSync('userid', this.data.user);
              wx.showToast({
                title: '登陆成功',
              });
              wx.navigateTo({
                url: '/pages/index/index',
              });
            }
          } else {
            wx.showToast({
              title: '账号不存在！！',
              icon: 'error',
              duration: 2500,
            });
          }
        } ,
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '登录失败，请检查网络连接',
          icon: 'none',
        });
      },
    });
  }
  
})
 

