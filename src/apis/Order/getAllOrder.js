import axios from "axios";
import { BASE_URL } from "apis/BaseUrl";

export const GetAllOrder = async () => {
  let res;
  try {

    const url = BASE_URL + '/v1/company/get/orders';
    res = await axios.get(url, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
  } catch (error) {
    res = error;
  }
  return res;
};