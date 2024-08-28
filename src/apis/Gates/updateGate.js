import axios from "axios";
import { BASE_URL } from "../BaseUrl";

export const UpdateGateApi = async (data) => {
  let res;
  //    console.log(5,id,data)
  try {
    const url = BASE_URL + "/v1/company/update/gate"

    res = axios.put(url, data, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } })
  } catch (error) {
    res = error
  }
  return res
}