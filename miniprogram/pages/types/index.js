// miniprogram/pages/index/index.js
import Toast from '../../components/dist/toast/toast';
import {
  clothesClass
} from "../../config/index"
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clothesClass: clothesClass,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.userInfo) {
      wx.switchTab({
          url: "/pages/user/index",
          complete:()=>{
              Toast.fail('请先登录');
          }
      });
      return;
    }
  }
})