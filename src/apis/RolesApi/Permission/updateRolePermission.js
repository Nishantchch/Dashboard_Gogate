import axios from "axios";
import { BASE_URL } from "../../BaseUrl";

export const UpdataRolePermission = async (data) => {

  let res;
  try {
    const url = BASE_URL + '/v1/admin/update/role_permissions'
    res = await axios.put(url, data,
      { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } })

  } catch (error) {
    res = error

  }
  return res;
}