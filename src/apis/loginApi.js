import axios from "axios";
import { BASE_URL } from "apis/BaseUrl";

// const BaseUrl = process.env.REACT_APP_API_URL
console.log(344, BASE_URL)
// const BaseUrl = process.env.REACT_APP_API_URL;


// export const LoginAPI = async () =>{
//   let res;
//   try {
//       const url = BaseUrl + '/login'
//       res = await axios.post(url)
//   } catch (error) {
//       res = error;
//   }
//   return res;
// }

// export const LoginAPI = async (data) => {
//   let res;
//   try {
//     const url = "http://192.168.1.11:8559/api/v1/login";
//     res = await axios.post(url, data
//       // {
//       //   headers: { Authorization: "Bearer " + localStorage.getItem("token") },

//       // }
//     );
//   } catch (error) {
//     res = error;
//   }
//   return res;
// };

export const LoginAPI = async (data) => {
  let res;
  try {
    const url = BASE_URL + "/api/v1/login";
    res = await axios.post(url, data
      // {
      //   headers: { Authorization: "Bearer " + localStorage.getItem("token") },

      // }
    );
  } catch (error) {
    res = error;
  }
  return res;
};