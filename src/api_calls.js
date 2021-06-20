import Cookie from 'react-native-cookie';
import axios from 'axios';
const fetch = require('node-fetch');
// const spDcCookie = "AQBQ6DmlhyOeMBJA3_r7FMaAVgrncouV-puT2iF8fu-PTLGXTh4q53axWiQo3gHiPYoi8O8KwDRnzYWVg6M9hlop58Ln4SBw_fyoyio57Wps"
// const spKeyCookie = "0c29bed4-a9f5-495d-bfc8-40495a61cb1e"
let token = "BQCRgyO2wPRnZLAEI-Cs1FeM4IYinumdfwNWDYHdIhMWYxrdj93W3lt-zzju3Mxbh4CQBxvP0mALoD1QOKUhcvd-gzkGIWfJt0LTJt9ve3Gldm_WCwQEmyGZ72BKCbxwY12JiabwBlO6TR1o2G3LgR4U9yUC16O6pQEY2W0orFi-YwZEd-jPHr3cQU7OhZRMes0u_sQY2cHp7pr1bqLMAtPZJ7MvFyr4dzfH1Sdf8DC75sSiLRgJbRrn3ozXeG6v_wQ64qqT2EBVYn5tHqORMiYVRElpxt2WK3-_S6ehPBq0";

export default {
  async fetchToken() {

    // let res = await axios.get('https://open.spotify.com/');
    // console.log( res.headers["set-cookie"]); 

    //Cookie.get('https://open.spotify.com/').then((cookie) => console.log(cookie));

    // const res = await fetch('https://open.spotify.com/get_access_token?reason=transport&productType=web_player', {
    //   // headers: {
    //   //   Cookie: `sp_dc=${spDcCookie},sp_key=${spKeyCookie}`
    //   // },
    //   credentials: 'include',
    // })
    // token = await res.json(); 
    // console.log(token);
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