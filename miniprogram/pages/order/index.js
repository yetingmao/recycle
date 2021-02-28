// miniprogram/pages/index/index.js
import {
  subscribe,
  hasSubscribe
} from "../../utils/index"
import Toast from '../../components/dist/toast/toast';
const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    order: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.look()
  },
  look() {
    if (!app.globalData.userInfo) {
      wx.switchTab({
        url: "/pages/user/index",
        complete: () => {
          Toast.fail('请先登录');
        }
      });
      return;
    }
    if (app.globalData.userInfo.role) {
      this.setData({
        role: app.globalData.userInfo.role,
      })
    }
    this.get();
  },
  get() {
    wx.cloud.callFunction({
      name: 'order_get',
      success: (res) => {
        const {
          result
        } = res;
        const order = result.map((item) => {
          let tag = "已通过"
          if (item.status === "1") {
            tag = "审核中"
          } else if (item.status === "2") {
            tag = "审核不通过"
          }
          return {
            id: item._id,
            userId: item.userId,
            tag,
            num: item.number,
            price: item.sale,
            title: `${item.type}--${item.value}`,
            desc: new Date(item.date).toLocaleString(),
          }
        })
        this.setData({
          order,
        })
      },
    })
  },
  check(e) {
    Toast.loading({
      message: '提交中...',
      forbidClick: true,
    });
    const {
      id,
      status,
      userid
    } = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset)
    wx.cloud.callFunction({
      name: 'order_update',
      data: {
        id,
        status,
        userId:userid
      },
      success: (res) => {
        this.look()
      },
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.look()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.data.msg.title,
      path: this.data.msg.path,
      imageUrl: this.data.msg.imageUrl,
    }
  }
})