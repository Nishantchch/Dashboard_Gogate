import axios from "axios";
import { BASE_URL } from "apis/BaseUrl";

console.log(344, BASE_URL)


export const ForgetAPI = async (data) => {
  let res;
  try {
    const url = BASE_URL + "/v1/user/post/forgetPassword";
    res = await axios.post(url, data
      // {
      //   headers: { Authorization: "Bearer " + localStorage.getItem("token") },

      // }
    );
  } catch (error) {
    res = error;
  }
  return res;
};