// miniprogram/pages/index/index.js
import Toast from '../../components/dist/toast/toast';
//import { subscribe, hasSubscribe} from "../../utils/index"
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    intergal: 0,
    role: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getUser()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.getUser()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.getUser()
        }
      })
    }
  },
  onShow: function () {
    this.getTabBar().init();
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.addUser()
  },
  addUser() {
    wx.cloud.callFunction({
      name: 'user_add',
      data: {
        userInfo: app.globalData.userInfo
      },
      success: (res) => {
        const {
          result
        } = res;
        this.setData({
          intergal: result.intergal,
          role: result.role,
        })
        app.globalData.userInfo = {
          ...app.globalData.userInfo,
          role: result.role,
        }
      },
    })
  },
  getUser() {
    wx.cloud.callFunction({
      name: 'user_get',
      success: (res) => {
        const {
          result
        } = res;
        this.setData({
          intergal: result.intergal,
          role: result.role,
        })
        app.globalData.userInfo = {
          ...app.globalData.userInfo,
          role: result.role,
        }

      },
    })
  },
  requestSubscribe() {
    wx.navigateToMiniProgram({
      appId: "wx2ea9ec17069611d0",
      path: "pages/index/index",
    })
    //申请发送订阅消息
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getUser()
  },
})