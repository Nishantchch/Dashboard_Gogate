import axios from "axios";


export const ResatePasswordAPI = async (data) => {
  let res;

  try {
    const url = 'http://206.189.141.51:8559/v1/user/reset/password';
    res = await axios.put(url, data);
  } catch (error) {
    res = error;
  }
  return res;
};