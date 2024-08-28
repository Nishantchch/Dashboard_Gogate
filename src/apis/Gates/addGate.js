
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

export const AddGateApi = async (data) => {
  let res;
  try {
    const url = BASE_URL + '/v1/company/add/gates'
    res = await axios.post(url, data,
      { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } })
  } catch (error) {
    res = error
  }
  return res
}