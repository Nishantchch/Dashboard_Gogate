import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// console.log(4, BASE_URL)
export const GetCompanylist = async (data) => {
  let res;
  try {

    const url = BASE_URL + '/v1/admin/get/company_list';
    res = await axios.post(url, data, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
  } catch (error) {
    res = error;
  }
  return res;
};