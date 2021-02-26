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
    thing: "",
    number: undefined,
    sale: undefined,
    value: undefined
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  changeNumber(e){
    this.setData({
      number: e.detail
    });
    if(this.data.sale){
      const value= parseFloat(e.detail,10)*parseFloat(this.data.sale,10);
      this.setData({
        value
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
        value
      });
    }
  },
  onSubmit(){
    
  }
})