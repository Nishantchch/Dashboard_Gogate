import axios from "axios";
import { BASE_URL } from "../BaseUrl";

console.log(4, BASE_URL)

export const GetAllRole = async () => {
  let res;
  try {

    const url = BASE_URL + '/v1/admin/get/roles';
    res = await axios.get(url, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
  } catch (error) {
    res = error;
  }
  return res;
};

// import axios from "axios";
// import { Main_path } from "apis/Path";
// import { API } from "constant_keys";
// const URL = process.env.REACT_APP_API_URL;
// console.log(4, API)

// export const GetAllRole = async () => {
//   let res;
//   try {
//     const url = `${Main_path}/admin/get/roles`;
//     console.log(26, url)
//     res = await axios.get(url, { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } });
//   } catch (error) {
//     res = error;
//   }
//   return res;
// };