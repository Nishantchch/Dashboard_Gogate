import axios from "axios";


export const VarifyTokenAPI = async (token) => {
  let res;
  console.log(10, token)

  try {
    const url = `http://206.189.141.51:8559/v1/user/verify/${token}`;
    res = await axios.put(url);
  } catch (error) {
    res = error;
  }
  return res;
};

// http://206.189.141.51/
