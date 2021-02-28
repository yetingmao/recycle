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
    const result = await db.collection('order').where({
      userId: OPENID,
    }).orderBy('date', 'desc').get();
    return result.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}