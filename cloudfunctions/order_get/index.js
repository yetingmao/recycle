// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "recycle-3gvyhifi18c77cbe"
});
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const {
      OPENID
    } = cloud.getWXContext();
    const user = await db.collection('user').where({
      touser: OPENID,
    }).get();
    const {
      role
    } = user.data[0];
    let option = {
      status: "1"
    };
    if (role !== "admin") {
      option = {
        userId: OPENID,
      }
    }
    const result = await db.collection('order').where(option).orderBy('date', 'desc').orderBy('status', 'asc').get();
    return result.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}