// pages/follow/follow.js
const app = getApp();
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:null,

  },
  //查看所关注作者的所有感悟
  toPlanList:function(){
    url: '/pages/personal/personal?see=1'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: app.globalData.token,
      uid: options.uid,
    })
    this.getRelationListInfo(1,true);
  },
  //关注列表
  getRelationListInfo: function(pageNo,override) {
    /*if (this.data.token == null) {
      this.setData({
        token: wx.getStorageSync('token'),
      });
    }*/
    let that = this
    pageNo: pageNo || that.data.pageNo
    let paramdata = {
      pageNo: pageNo || that.data.pageNo,
      pageSize: that.data.pageSize,
      token: this.data.token,
      userId:this.data.uid
    }
    return util.requestApi(`${app.globalReqUrl}/relaion/tomatoes/listRelation`, paramdata).then(
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
          relationTotal: res.data.total,
          relationList:override?res.data.list: this.data.relationList.concat(res.data.list),
        });
        console.log("relationLists：", res.data.list)
        if (this.data.relationList.length >= this.data.relationTotal){
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})