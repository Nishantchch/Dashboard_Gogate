import axios from "axios";
import { BASE_URL } from "../BaseUrl";

export const deleteRoleApi = async (data) => {
  let res;
  try {
    const url = BASE_URL + "/v1/admin/delete/roles"
    res = await axios.delete(url, {
      data,
      headers: { "Authorization": "Bearer " + localStorage.getItem('_token') }
    }
    )
  } catch (error) {
    res = error
  }
  return res
}