import axios from 'axios';

const api = axios.create({
  baseURL: 'https://excelanalytics-ciws.onrender.com',
  withCredentials: true,
});

export default api;
