import axios from "axios";
import { BASE_URL } from "../../BaseUrl";

export const GetRolePermission = async () => {
  let res;
  try {
    const url = BASE_URL + "/v1/admin/get/role_permissions";
    res = await axios.get(url, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
  } catch (error) {
    error = res;
  }
  return res;
};
