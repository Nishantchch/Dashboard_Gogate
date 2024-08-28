import axios from "axios";
import { BASE_URL } from "apis/BaseUrl";


export const GetMapApi = async () => {
  let res;
  try {

    const url = BASE_URL + '/v1/user/get/location';
    res = await axios.get(url, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
  } catch (error) {
    res = error;
  }
  return res;
};