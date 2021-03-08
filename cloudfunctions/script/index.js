// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "recycle-3gvyhifi18c77cbe"
});
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // try {
  //   return await db.collection('order').where({
  //     status: "2"
  //   }).remove()
  // } catch (e) {
  //   console.log(e)
  // }
  try {
    return await db.collection('user').where({
      role: "user"
    }).remove()
  } catch (e) {
    console.log(e)
  }
}