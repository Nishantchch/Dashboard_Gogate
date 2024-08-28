import axios from "axios";
import { BASE_URL } from "../BaseUrl";


export const SuperAdminGateListApi = async () => {
  let res;
  try {

    const url = BASE_URL + '/v1/company/get/superadminGateList';
    res = await axios.get(url, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
  } catch (error) {
    res = error;
  }
  return res;
};