// miniprogram/pages/index/index.js
import {
  subscribe,
  hasSubscribe
} from "../../utils/index"
import Toast from '../../components/dist/toast/toast';
import {
  clothesClass
} from "../../config/index"
const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clothesClass: clothesClass,
    show: false,
    clothes: {},
    type: "",
    number: undefined,
    sale: undefined,
    value: undefined,
    other:"",
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
  },
  selectClothes(e) {
    this.setData({
      show: true,
      clothes: clothesClass[e.currentTarget.id]
    });
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  changeOther(e){
    this.setData({
      other: e.detail
    });
  },
  changeNumber(e){
    this.setData({
      number: e.detail
    });
    if(this.data.sale){
      const value= parseFloat(e.detail,10)*parseFloat(this.data.sale,10);
      this.setData({
        value:value.toFixed(2)
      });
    }
  },
  changeSale(e){
    this.setData({
      sale: e.detail
    });
    if(this.data.number){
      const value= parseFloat(e.detail,10)*parseFloat(this.data.number,10)
      this.setData({
        value:value.toFixed(2)
      });
    }
  },
  onSubmit(){
    Toast.loading({
      message: '提交中...',
      forbidClick: true,
    });
    let that=this;
    wx.cloud.callFunction({
      name: 'order_add',
      data: {
        data:{
          value:this.data.value,
          type: this.data.clothes.text,
          number: this.data.number,
          sale:this.data.sale,
          other:this.data.other,
        }
      },
      success: (res) => {
        Toast.success('提交成功');
        that.setData({
          clothes: {},
          type: "",
          number: "",
          sale: "",
          value: "",
          other:"",
        })
      },
      fail: (res) => {
        console.log("uploadFile fail", res);
        Toast.fail('提交失败');
      },
    })
  }
})