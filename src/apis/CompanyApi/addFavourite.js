import axios from "axios";
import { BASE_URL } from "apis/BaseUrl";
const URL = process.env.REACT_APP_API_URL
const NewURL = URL.slice(0, URL.length - 7)
console.log(4444, BASE_URL, NewURL, URL)
export const AddFavouriteApi = async (data) => {
  let res;
  try {
    const url = `${BASE_URL}/v1/admin/add/favourite`
    res = await axios.put(url, data,
      { headers: { "Authorization": "Bearer " + localStorage.getItem('_token') } })
  } catch (error) {
    res = error
  }
  return res
}