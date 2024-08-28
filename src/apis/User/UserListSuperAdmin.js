import axios from "axios";
import { BASE_URL } from "../BaseUrl";

export const GetAllSuperUser = async (data) => {
  let res;
  try {
    const url = BASE_URL + '/v1/admin/get/company/user_list'
    res = await axios.post(url, data, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
  } catch (error) {
    res = error;
  }
  return res;
}