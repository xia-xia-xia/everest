// pages/follow/follow.js
const app = getApp();
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    relationListInfo: null
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
    })
    this.getRelationListInfo();
  },
  //关注列表
  getRelationListInfo: function() {
    let paramdata = {
      token: this.data.token
    }
    return util.requestApi(`${app.globalReqUrl}/relation/tomatoes/relationList`, paramdata).then(
      res => {
        this.setData({
          relationListInfo: res.data
        });
        console.log("relationListInfo:",res.data)
        return res.data;
      },
      err => {
        console.log('error', err)
        return err;
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