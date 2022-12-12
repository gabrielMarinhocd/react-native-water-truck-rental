import axios from "axios";

const api = axios.create({
  baseURL: "https://water-truck.onrender.com/",
});

export default api;
