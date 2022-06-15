import axios from "axios"
const axiosInstance = axios.create({
  baseURL: "https://sharelinkshere.herokuapp.com",
})
export default axiosInstance
