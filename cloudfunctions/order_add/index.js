// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "recycle-3gvyhifi18c77cbe"
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const {
      OPENID
    } = cloud.getWXContext();
    const {
      data
    } = event;
    // 在云开发数据库中存储订阅任务
    await db.collection('order').add({
      data: {
        userId: OPENID, // 订阅者的openid
        date: new Date(),
        status: "1",
        ...data,
      },
    });
  } catch (err) {
    console.log(err);
    return false;
  }
}