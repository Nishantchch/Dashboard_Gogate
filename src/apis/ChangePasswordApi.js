import axios from "axios";
import { BASE_URL } from "apis/BaseUrl";

console.log(344, BASE_URL)


export const ChangePasswordAPI = async (data) => {
  let res;
  try {
    const url = BASE_URL + "/v1/user/change/password";
    res = await axios.put(url, data, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } }
    );
  } catch (error) {
    res = error;
  }
  return res;
};