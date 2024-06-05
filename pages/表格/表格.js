// pages/formSubmit/formSubmit.js
Page({
  data: {
    name:'',
  },

  
  formSubmit: function(e) {
    // 获取表单的值
    const formData = e.detail.value;
    const that=this;

    // 发起网络请求，将数据发送到后端服务器
    wx.request({
      url: 'http://101.35.249.68/my.php/', 
      method: 'POST', 
      data: formData, // 直接传递表单的值作为请求数据
      success(res) {
        console.log('提交成功：', res.data);
        // 在这里处理后端返回的数据

        that.setData({
          name:''
        });

         wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
    });
   

      },
      fail(err) {
        console.error('提交失败：', err);
        // 在这里处理请求失败的情况

    wx.showToast({
      title: '提交失败',
      icon: 'error',
      duration: 2000
    });

      }
    });
  }
});
