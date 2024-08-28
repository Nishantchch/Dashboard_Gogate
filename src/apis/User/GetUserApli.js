import axios from "axios";
import { BASE_URL } from "../BaseUrl";

export const GetAllUser = async () => {
  let res;
  try {
    const url = BASE_URL + '/v1/admin/get/assignRoleToUser'
    res = await axios.get(url, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
  } catch (error) {
    res = error;
  }
  return res;
}