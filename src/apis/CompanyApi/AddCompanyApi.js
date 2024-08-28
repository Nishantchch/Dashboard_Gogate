
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

export const AddCompanyApi = async (data) => {
  let res;
  try {
    const url = BASE_URL + '/v1/admin/create/company'
    res = await axios.post(url, data,
      { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } })
  } catch (error) {
    res = error
  }
  return res
}