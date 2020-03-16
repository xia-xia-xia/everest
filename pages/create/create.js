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
    status: null,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 11, 1).getTime(),
    beginTime: new Date().getTime(),
    endTime: new Date().getTime(),
    beginTimeForShow: null,
    endTimeForShow: null,
  },
  beginTimeInput(event) {
    this.setData({
      beginTime: event.detail,
      beginTimeForShow: util.formatTimeTwo(event.detail, "Y-M-D h:m:s"),
    });
  },
  endTimeInput(event) {
    this.setData({
      endTime: event.detail,
      endTimeForShow: util.formatTimeTwo(event.detail, "Y-M-D h:m:s"),
    });
    console.log("currentDate:", util.formatTimeTwo(this.data.endTime, "'Y-M-D h:m:s'"))
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
      beginTimeForShow: util.formatTimeTwo(this.data.beginTime, "Y-M-D h:m:s"),
      endTimeForShow: util.formatTimeTwo(this.data.endTime, "Y-M-D h:m:s"),
    });
  },
  onSubmit: function(e) {
    console.log(e.detail.value);
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
    if(e.detail.beginTime<=e.detail.endTime){
      wx.showToast({
        title: '起始日期有误！',
        duration:3000
      })
    }
    let paramdata = {
      token: this.data.token,
      type: this.data.type,
      title: e.detail.value.title,
      content: e.detail.value.content,
      beginTime: this.data.beginTime,
      endTime: this.data.endTime
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