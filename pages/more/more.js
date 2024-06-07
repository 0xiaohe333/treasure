Page({
  data: {
    currentContent: 'contentB', // 初始显示内容B
    majors: ['计算机科学', '数学', '物理', '化学'], // 专业列表
    selectedMajorIndex: 0, // 默认选中第一个专业
    name: '', // 输入的学生名字
    users: [],//所有的学生数组
    students:[],//符合条件的学生数组


    allChecked: false,//是否全选
    ungroupedStudents:[
      {id:1,name:'he',occupation:'学生'},
      {id:2,name:'xiao',occupation:'销售'},
      {id:3,name:'ya',occupation:'老师'}
    ], // 未分组学生列表
    ungroupedCount: 0 ,// 未分组学生数量
    checkboxes:[
      {id:1,name:'he',occupation:'学生'},
      {id:2,name:'xiao',occupation:'销售'},
      {id:3,name:'ya',occupation:'老师'}
    ],//未分组的学生数组加一个checked属性
    selectedStudents:[],
    groupedStudents: [] // 分组后的学生列表
  },

  switchContent(e) {
    this.setData({
      currentContent: e.currentTarget.dataset.content // 根据点击的按钮更新当前显示的内容
    });
  },
  // 专业选择变化时触发
  bindMajorChange: function(e) {
    this.setData({
      selectedMajorIndex: e.detail.value
    });
  },

  // 名字输入变化时触发
  bindNameInput: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
//搜索按钮事件
  searchStudents: function() {
    const major = this.data.majors[this.data.selectedMajorIndex];
    const name = this.data.name;
    
    const users = this.data.users;
    // 假设这里根据你的专业和名字查询到了学生列表
    //*******
        if (name) {
          // 根据名字过滤学生列表
          this.setData({
            students: users.filter(user=> user.name.includes(name))
          });
        }
      },
    
//页面加载函数
 onLoad: function () {
  this.setData({
    users:wx.getStorageSync('userid')
  });
  //获取未分组学生
    this.fetchUngroupedStudents();
  //更新带有checked属性的数组
    this.fetchcheckboxes();
  },

  //获取未分组学生函数
  fetchUngroupedStudents: function () {
    const users = this.data.users;
      //遍历此数组，满足条件的重新分为ungroupedStudents
   // let ungroupedStudents=users.filter(user => user.isgrouped===0);
      //算出此数组的长度
    //let ungroupedCount=ungroupedStudentS.length;
       //更新页面的值
    //  this.setData({
    // ungroupedStudents:ungroupedStudents,
    // ungroupedCount:ungroupedCount
    //     });
      },

    //更新带有checked属性的数组函数
   fetchcheckboxes:function(){
     const ungroupedStudents=this.data.ungroupedStudents;
     //为每个对象添加checked属性，并设置默认值为false;
     const checkboxesWithChecked=ungroupedStudents.map(item =>({
       ...item,//使用展开运算符复制原对象
       checked:false//添加checked属性
     }));
     //更新页面数据
     this.setData({
      checkboxes:checkboxesWithChecked
     });


    },

  checkAll: function(e) {
    //设置全选框的状态
    this.setData({
      allChecked: e.detail.value[0]
    });
    //遍历checkbox列表，改变checked属性
    const checkboxes=this.data.checkboxes.map(item =>({
      ...item,
      checked:e.detail.value[0]
    }));
    this.setData({
      checkboxes
    });
  },

  checkboxChange:function(e){
    this.setData({
      selectedIds:e.detail.value,
    });
  },
  groupStudents:function(){
    let groupedStudents=[];
    let ungroupedStudents=this.data.ungroupedStudents;
    let selectedIds=this.data.selectedIds;

    //遍历已选中的ID，将对应的学生移动到GroupedStudents中
    for(let i=ungroupedStudents.length-1;i>=0;i--){
      if(selectedIds.includes(ungroupedStudents[i].id)){
        ungroupedStudents[i].isgrouped=true;//更新isgrouped属性
        groupedStudents.push(ungroupedStudents.splice(i,1)[0]);//从ungroupedStudents中移除并添加到groupedStudents中
      }
    }
    this.setData({
      ungroupedStudents:ungroupedStudents,//更新未分组的学生数组
      groupedStudents:groupedStudents,//更新已分组的学生数组
      selectedIds:[]//清空已经选中的学生ID数组
    });
  }
});