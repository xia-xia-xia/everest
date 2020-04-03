//user.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    token: null,
    total: null,
    planList: null,
  },
  /**
   * 新建计划
   */
  created: function() {
    wx.navigateTo({
      url: '/pages/create/create',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo,
      token: app.globalData.token
    });
  },
  /**
   * 私密感悟
   */
  private: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?type=1'
    })
  },
  /**
   * 公开感悟
   */
  public: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?type=2'
    })
  },
  /**
   * 重点推荐
   */
  import: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?type=4'
    })
  },
  /**
   * 我的收藏
   */
  star: function() {
    wx.navigateTo({
      url: '/pages/personal/personal?upvote=1'
    })
  },
  see: function() {
    wx.navigateTo({
      url: '/pages/follow/follow'
    })
  },
});