// pages/detail/detail.js
const app = getApp();
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: null,
    userInfo: null,
    planInfo: null,
    token: null
  },
  //关注作者
  guan: function() {
    if (this.data.planInfo.userId == this.data.userInfo.id) {
      wx.showToast({
        title: '不能关注自己哦～',
        duration: 3000
      })
      return;
    }
    let paramdata = {
      token: this.data.token,
      planId: this.data.planInfo.id,
      type: 1
    }
    console.log(paramdata);
    return util.requestApi(`${app.globalReqUrl}/relation/tomatoes/addRelation`, paramdata).then(
      res => {
        this.setData({
          planInfo: res.data
        });
        return res.data
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  //点赞
  zan: function() {
    let paramdata = {
      token: this.data.token,
      planId: this.data.planInfo.id,
      type: 2
    }
    console.log(paramdata);
    return util.requestApi(`${app.globalReqUrl}/relation/tomatoes/addRelation`, paramdata).then(
      res => {
        this.setData({
          planInfo: res.data
        });
        return res.data
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  //收藏
  collection: function () {
    let paramdata = {
      token: this.data.token,
      planId: this.data.planInfo.id,
      type: 3
    }
    console.log(paramdata);
    return util.requestApi(`${app.globalReqUrl}/relation/tomatoes/addRelation`, paramdata).then(
      res => {
        this.setData({
          planInfo: res.data
        });
        return res.data
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      token: app.globalData.token,
      pid: options.pid,
      userInfo: app.globalData.userInfo
    })
    this.getPlanDetail();
  },

  getPlanDetail: function() {
    let paramdata = {
      token: this.data.token,
      planId: this.data.pid
    }
    return util.requestApi(`${app.globalReqUrl}/plan/apple/detailPlan`, paramdata).then(
      res => {

        this.setData({
          planInfo: res.data
        });
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (res.from === 'button') {
    }
    return {
      title: '转发',
      path: '/pages/detail/detail',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  //更多围观用户展示
  moreguan: function () {

  },
  //添加评论
  commitComment: function(e){
    //console.log('评论内容:',e.detail.value.comment)
    let paramdata = {
      token: this.data.token,
      comment: e.detail.value.comment,
      planId:this.data.pid,
      uid:app.globalData.userInfo.id
    }
    console.log(paramdata);
    return util.requestApi(`${app.globalReqUrl}/comment/talk/addComment`, paramdata).then(
      res => {
        wx.navigateTo({
          url: '/pages/commentlist/commentlist'
        })
        return res.data
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  //展示评论列表
  toCommentList:function(){
    wx.navigateTo({
      url: '/pages/commentlist/commentlist'
    })
  }
})