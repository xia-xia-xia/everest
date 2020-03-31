// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    commentTotal: null,
    commentList: [],
    pageNo: 1,
    pageSize: 10,
    noMoreData: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      token: app.globalData.token
    });
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
    this.getCommentListInfo(1,true);
  },
  getCommentListInfo: function(pageNo,override) {
    if (this.data.token == null) {
      this.setData({
        token: wx.getStorageSync('token')
      });
    }
    console.log("消息:", this.data.token)
    let that = this
    pageNo: pageNo || that.data.pageNo
    let paramdata = {
      pageNo: pageNo || that.data.pageNo,
      pageSize: that.data.pageSize,
      token: this.data.token,
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
          commentTotal: res.data.commentTotal,
          commentList:override?res.data.list: this.data.commentList.concat(res.data.list),
        });
        console.log("commentReply", res.data.list)
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
    if (this.data.noMoreData) {
      wx.showToast({
        title: '正在刷新...',
        icon: 'loading',
        mask: true
      })
      this.getPlanListInfo(1, true).then(() => {
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
  onReachBottom: function () {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})