import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
});

export default axiosApi;
