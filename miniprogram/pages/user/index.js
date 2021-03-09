// miniprogram/pages/index/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  onShow: function () {
    this.getTabBar().init();
  },
  getUserInfo(e) {
    const userInfo = e.detail.userInfo
    this.getUser(userInfo)
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
  getUser(userInfo) {
    wx.cloud.callFunction({
      name: 'user_get',
      success: (res) => {
        const {
          result
        } = res;
        if(result){
          const { role}=result;
          let _role="普通用户"
          if(role==="2"){
            _role="区域管理员"
          }else if(role==="3"){
            _role="管理员"
          }
          app.globalData.userInfo = {...result,role:_role};
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        }else{
          //还没有注册的
          app.globalData.userInfo = userInfo;
          wx.navigateTo({
            url: '/pages/register/index',
          })
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