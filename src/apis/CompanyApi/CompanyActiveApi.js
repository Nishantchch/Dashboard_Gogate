import axios from "axios";
import { BASE_URL } from "../BaseUrl";

export const CompanyActiveApi = async (data) => {
  let res;
  try {
    const url = BASE_URL + '/v1/admin/active_inactive/company'
    res = await axios.put(url, data,
      { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } })
  } catch (error) {
    res = error
  }
  return res
}