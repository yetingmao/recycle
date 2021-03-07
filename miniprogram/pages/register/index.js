// miniprogram/pages/index/index.js
import Toast from '../../components/dist/toast/toast';
import {
  Area
} from "../../config/index";
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    tel: "",
    areaList: Area,
    address: "",
    show: false,
    adressdetail: "",
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeusername(e) {
    this.setData({
      username: e.detail
    })
  },
  changetel(e) {
    this.setData({
      tel: e.detail
    })
  },
  changeadressdetail(e) {
    this.setData({
      adressdetail: e.detail
    })
  },
  show() {
    this.setData({
      show: !this.data.show
    })
  },
  selectaderss(e) {
    const {
      values
    } = e.detail;
    const data = values.map(item => item.name).join("-");
    this.setData({
      address: data,
    })
    this.show()
  },

  addUser() {
    const {
      username,
      tel,
      address,
      adressdetail,
    } = this.data;
    console.log(this.data)
    if (username && tel && address && adressdetail) {
      wx.cloud.callFunction({
        name: 'user_add',
        data: {
          userInfo: {...app.globalData.userInfo,username,tel,address,adressdetail}
        },
        success: (res) => {
          const {
            result
          } = res;
          app.globalData.userInfo = result
          this.setData({
            loading: false,
          })
          wx.reLaunch({
            url: '/pages/user/index',
          })
        },
      })
    } else {
      Toast.fail("信息补充完整");
    }
  }
})