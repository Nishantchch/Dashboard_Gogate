import axios from "axios";
import { BASE_URL } from "../BaseUrl";


export const GetCompanyApi = async () => {
  let res;
  try {

    const url = BASE_URL + '/v1/admin/get/allCompanies';
    res = await axios.get(url, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
  } catch (error) {
    res = error;
  }
  return res;
};