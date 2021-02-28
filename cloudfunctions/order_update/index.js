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
      id,
      status,
      userId,
    } = event;
    const order = await db.collection('order').doc(id);
    const orderResult=  await order.update({
      data: {
        status,
      },
    });
    if (orderResult.errMsg === "document.update:ok" && status === '3') {
      const orderData = await order.get();
      const { value }=orderData.data;
      const user = await db.collection('user').where({
        touser:userId,
      });
      const userData= await user.get();
      const {intergal }=userData.data[0];
      const data= intergal + Math.ceil(value);
      await user.update({
        data:{
          intergal: data
        }
      })
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}