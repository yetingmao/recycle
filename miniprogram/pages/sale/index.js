// miniprogram/pages/index/index.js
import Toast from '../../components/dist/toast/toast';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    number: "",
    show: false,
    loading: false,
    time: undefined,
    minDate: new Date().getTime(),
    maxDate: new Date(new Date().getTime() + 604800000).getTime(),
    currentDate: new Date().getTime(),
    showTime: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type || "统收"
    });
  },
  changenumber(e) {
    this.setData({
      number: e.detail
    })
  },
  show() {
    this.setData({
      showTime: !this.data.showTime
    })
  },
  selecttime(e) {
    this.setData({
      currentDate: e.detail,
      time: new Date(e.detail).toLocaleString(),
    })
    this.show()
  },

  playOrder() {
    this.setData({
      loading: true,
    })
    const {
      time,
      number,
      type,
    } = this.data;
    if (time && number) {
      wx.cloud.callFunction({
        name: 'order_add',
        data: { 
          data:{
            time,
            number,
            type
          }
        },
        success: (res) => {
          this.setData({
            loading: false,
            type: "",
            number: "",
          })
          Toast.fail('提交成功');
          wx.reLaunch({
            url: '/pages/types/index',
          })
        },
        fail: (res) => {
          this.setData({
            loading: false,
          })
          console.log("uploadFile fail", res);
          Toast.fail('提交失败');
        },
      })
    } else {
      Toast.fail("信息补充完整");
    }
  }
})