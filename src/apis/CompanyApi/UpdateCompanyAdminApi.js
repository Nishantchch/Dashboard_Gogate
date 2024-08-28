import axios from "axios";
import { BASE_URL } from "../BaseUrl";

export const UpdateCompanyAdmin = async (data) => {
  let res;
  //    console.log(5,id,data)
  try {
    const url = BASE_URL + "/v1/admin/update/company_admin"

    res = axios.put(url, data, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } })
  } catch (error) {
    res = error
  }
  return res
}