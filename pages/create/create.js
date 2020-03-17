const app = getApp();
var util = require("../../utils/util")
Page({
  data: {
    array: ['计算机类', '医学类', '工程类', '金融类','管理类'],
    objectArray: [
      {
        id: 0,
        name: '计算机类'
      },
      {
        id: 1,
        name: '医学类'
      },
      {
        id: 2,
        name: '工程类'
      },
      {
        id: 3,
        name: '金融类'
      },
      {
        id: 4,
        name: '管理类'
      }
    ],
    index: 0,
    userInfo: null,
    token: null,
    type: 2,
  },
  switchChange: function(e) {
    if (e.detail.value) {
      this.setData({
        type: 2,
      })
    } else {
      this.setData({
        type: 1,
      })
    }
  },
  return: function () {
    wx.showModal({
      title: '提示',
      content: '您确定要放弃发布了吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击了“确定”')
          wx.switchTab({
            url: '/pages/user/user',
          })
        }
      }
    })
  },
  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo,
      token: wx.getStorageSync("token"),
    });
  },
  onSubmit: function(e) {
    console.log(e.detail.value);
    if (e.detail.value.book.length == 0 || e.detail.value.book.length > 20) {
      wx.showToast({
        title: '书名20字以内哦',
        duration: 3000
      })
      return;
    }
    if (e.detail.value.title.length == 0 || e.detail.value.title.length > 20) {
      wx.showToast({
        title: '标题20字以内哦',
        duration: 3000
      })
      return;
    }
    if (e.detail.value.content.length == 0 || e.detail.value.content.length > 200) {
      wx.showToast({
        title: '内容200字以内',
        duration: 3000
      })
      return;
    }
    let paramdata = {
      token: this.data.token,
      type: this.data.type,
      book: e.detail.value.book,
      title: e.detail.value.title,
      content: e.detail.value.content,
    }
    return util.requestApi(`${app.globalReqUrl}/plan/apple/addPlan`, paramdata).then(
      res => {
        wx.switchTab({
          url: '/pages/square/square'
        })
        return res.data
      },
      err => {
        console.log('error', err)
        return err
      }
    )
  },
  bindPickerChange: function (e) {
    console.log('picker发生选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

});