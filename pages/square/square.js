const app = getApp()
var util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['计算机类', '医学类', '工程类', '金融类', '管理类'],
    objectArray: [
      {id: 0,name: '计算机类'},
      {id: 1,name: '医学类'},
      {id: 2,name: '工程类'},
      {id: 3,name: '金融类'},
      {id: 4,name: '管理类'}
    ],
    index: 0,
    option1: [
      { text: "全部类别", value: 0 },
      { text: "计算机类", value: 1 },
      { text: "医学类", value: 2 },
      { text: "工程类", value: 3 },
      { text: "金融类", value: 4 },
      { text: "管理类", value: 5 },
    ],
    value1: 0,
    token: null,
    total: null,
    planList: [],
    pageNo: 1,
    pageSize: 10,
    noMoreData: false,
    searchStatus:false,
    searchKey:null,
    bookType:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      token: app.globalData.token
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getPlanListInfo(1,true);
  },
  getPlanListInfo: function(pageNo,override) {
    if (this.data.token == null) {
      this.setData({
        token: wx.getStorageSync('token')
      });
    }
    console.log("广场:", this.data.token)
    let that = this
    pageNo: pageNo || that.data.pageNo
    let paramdata = {
      pageNo: pageNo || that.data.pageNo,
      pageSize: that.data.pageSize,
      token: this.data.token,
      types: [2],
      searchKey: that.data.searchKey,
      bookType: that.data.bookType
    }
    return util.requestApi(`${app.globalReqUrl}/plan/apple/listPlan`, paramdata).then(
      res => {
        
        if (res.data.list.length < that.data.pageSize) {
          this.setData({
            noMoreData: true
          })
        } else {
          this.setData({
            noMoreData: false
          })
        }
        this.setData({
          total: res.data.total,
          planList:override?res.data.list: this.data.planList.concat(res.data.list),
        });
        console.log("plan", res.data.list)
        if (this.data.planList.length >= this.data.total){
          this.setData({
            noMoreData: true
          })
        }else{
          this.setData({
            noMoreData: false
          })
        }
        return res.data;
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      searchKey: null,
      searchStatus: false,
      value1:0,
      bookType:null
    });
    this.getPlanListInfo(1, true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 到页面底部时，请求列表
    if (!this.data.noMoreData) {
      this.setData({
        pageNo: ++this.data.pageNo
      })
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        mask: true
      })
      this.getPlanListInfo(this.data.pageNo)
    } else {
      console.log('已经加载到底部了')
    }
  },
  clickPlan: function(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?pid=' + e.currentTarget.dataset.pid
    })
  },
  //搜索输入框输入取值
  searchInputEvent: function (e) {
    //console.log('搜索框输入为：',e.detail.value)
    this.setData({ 
      searchKey: e.detail.value 
    });
  },

  //搜索按钮点击事件
  searchClickEvent: function (e) {
    this.getPlanListInfo(1, true);
  },
  //筛选类别
  bindPickerChange: function (e) {
    console.log('picker发生选择改变，携带下标为', e.detail.value)
    //console.log('picker发生选择改变，携带值为', this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value,
      //bookType: this.data.array[e.detail.value]
    })
  },
  kindChange: function (e) {
    console.log('选择改变，携带下标为', e.detail)
    console.log('picker发生选择改变，携带值为', this.data.option1[e.detail].text)
    if (e.detail==0){
      this.setData({
        bookType: null,
      })
    }else{
      this.setData({
        bookType: this.data.option1[e.detail].text,
      })
    }
    this.getPlanListInfo(1, true);
  },
})