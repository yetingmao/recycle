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
    const result = await db.collection('user').where({
      touser: OPENID,
    }).get();
    const data=result.data[0];
    if(data){
      return data
    }
    const userInfo=event.userInfo;
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
    return {
      intergal:0,
      role:"user",
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};