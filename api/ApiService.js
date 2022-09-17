import axios from "axios";

const api = axios.create({
  baseURL: "https://gabriel-marinho-pipa.herokuapp.com/",
});

export default api;
