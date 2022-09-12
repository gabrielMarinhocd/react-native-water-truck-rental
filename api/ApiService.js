import axios from "axios";

const api = axios.create({
  baseURL: "https://gabriel-marinho-pipa.herokuapp.com/",
});

export default api;

// import axios from 'axios';

// const API_URL =
//   'http://localhost:3001/';
// const API_URL_Trasaction =
//   'https://gabriel-controlhe-financeiro.herokuapp.com/api/transaction';


// async function getAllClients(yearMonth) {
//   const res = await axios.get(`${API_URL}/cliente`);

//   console.log(res);
// }

// async function insertGrade(grade) {
//   const response = await axios.post(API_URL_Trasaction, grade);
//   console.log(response.data);
//   return response.data;
// }

// async function updateGrade(grade) {
//   const response = await axios.patch(
//     `${API_URL_Trasaction}?id=${grade.id}`,
//     grade
//   );
//   return response.data;
// }

// async function deleteGrade(grade) {
//   const response = await axios.delete(`${API_URL_Trasaction}?id=${grade._id}`);
//   return response.data;
// }

// export { getAllClients };
