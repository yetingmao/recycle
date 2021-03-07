const cloud = require('wx-server-sdk');
cloud.init({
  env: "recycle-3gvyhifi18c77cbe"
});
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const {
      OPENID
    } = cloud.getWXContext();
    const userInfo=event.userInfo;
    const { address,adressdetail}=userInfo;
    delete userInfo.address
    delete userInfo.adressdetail
    // 在云开发数据库中存储订阅任务
    await db.collection('user').add({
      data: {
        ...userInfo,
        touser: OPENID, // 订阅者的openid
        date:new Date(),
        intergal:0,
        role:"user",
      },
    });
    await db.collection('address').add({
      data: {
        touser: OPENID, // 订阅者的openid
        address:[
          address+'&'+adressdetail
        ]
      },
    });
    return {...userInfo,address,adressdetail}
  } catch (err) {
    console.log(err);
    return false;
  }
};