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
    token: null,
    //评论区
    comment: null,
    commentTotal: null,
    commentList: [],
    pageNo: 1,
    pageSize: 100,
    noMoreData: false,
    reply:null,

    //releaseFocus: false,
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
      userInfo: app.globalData.userInfo,
    })
    this.getPlanDetail();
    this.getCommentListInfo(1,true);
  },
  //感悟详情
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
 //评论列表
  getCommentListInfo: function(pageNo,override) {
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
      planId:this.data.pid
    }
    return util.requestApi(`${app.globalReqUrl}/comment/talk/listComment`, paramdata).then(
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
          commentTotal: res.data.total,
          commentList:override?res.data.list: this.data.commentList.concat(res.data.list),
        });
        console.log("commentLists：", res.data.list)
        if (this.data.commentList.length >= this.data.commentTotal){
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
  //回复
  commitReply: function (e) {
    //console.log('回复内容:',e.detail.value.reply)
    if (e.detail.value.reply.length == 0 || e.detail.value.reply.length > 20) {
      wx.showToast({
        title: '回复20字以内哦',
        duration: 3000
      })
      return;
    }
    let paramdata = {
      token: this.data.token,
      comment: e.detail.value.reply,
      replyId: e.detail.value.id,
    }
    console.log(paramdata);
    return util.requestApi(`${app.globalReqUrl}/comment/talk/addComment`, paramdata).then(
      res => {
        this.setData({
          reply: null
        });
        this.getCommentListInfo(1, true);
        return;
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
    if (this.data.noMoreData) {
      wx.showToast({
        title: '正在刷新...',
        icon: 'loading',
        mask: true
      })
      this.getCommentListInfo(1, true).then(() => {
        wx.stopPullDownRefresh()
      })
    } else {
      wx.showToast({
        title: '这是最新状态哟',
        duration: 3000,
      })
    }
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
      this.getCommentListInfo(this.data.pageNo)
    } else {
      console.log('已经加载到底部了')
    }
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
    //console.log('评论内容:',this.data.comment)
    if (e.detail.value.comment.length == 0 || e.detail.value.comment.length > 20) {
      wx.showToast({
        title: '评论20字以内哦',
        duration: 3000
      })
      return;
    }
    let paramdata = {
      token: this.data.token,
      comment: this.data.comment,
      planId:this.data.pid,
      uid:app.globalData.userInfo.id
    }
    console.log(paramdata);
    return util.requestApi(`${app.globalReqUrl}/comment/talk/addComment`, paramdata).then(
      res => {
        this.setData({
          comment: null
        });
        this.getCommentListInfo(1, true);
        return;
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  //评论输入框输入取值
  onChange(e) {
    this.setData({ 
      comment: e.detail 
    });
  },
   /**
     * 点击回复
     */
    /*bindReply: function(e){
      this.setData({
          releaseFocus: true
      })
  }*/
})