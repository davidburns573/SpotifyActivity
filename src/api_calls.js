const fetch = require('node-fetch');
const spDcCookie = "AQBB1UksprZnoA2SZ-H2LqO8ilkd5E5T7atV2hMP1m2NMYSjDoeQaugv83OCoJXoN-1roHuvl4yuLmM9nqlb8BASQfa1PFUH6yo17b0Qep2TXg"
let token = "BQCRgyO2wPRnZLAEI-Cs1FeM4IYinumdfwNWDYHdIhMWYxrdj93W3lt-zzju3Mxbh4CQBxvP0mALoD1QOKUhcvd-gzkGIWfJt0LTJt9ve3Gldm_WCwQEmyGZ72BKCbxwY12JiabwBlO6TR1o2G3LgR4U9yUC16O6pQEY2W0orFi-YwZEd-jPHr3cQU7OhZRMes0u_sQY2cHp7pr1bqLMAtPZJ7MvFyr4dzfH1Sdf8DC75sSiLRgJbRrn3ozXeG6v_wQ64qqT2EBVYn5tHqORMiYVRElpxt2WK3-_S6ehPBq0";

export default {
  async fetchToken() {
    const res = await fetch('https://open.spotify.com/get_access_token?reason=transport&productType=web_player', {
      headers: {
        Cookie: `sp_dc=${spDcCookie}`
      }
    })
    token = await res.json(); 
    console.log(token);
  },
  async fetchActivity(text) {
    console.log(text);
    const res = await fetch('https://guc-spclient.spotify.com/presence-view/v1/buddylist', {
      headers: {
        Authorization: `Bearer ${text}`
      }
    })
    console.log(res);
    if (res.status != 200) {
      console.log("ERROR: ");
      console.log(res);
      return null;
    }
    let friendActivity = await res.json();
    if (friendActivity == null) return null;
    return friendActivity.friends.reverse();
  },
};