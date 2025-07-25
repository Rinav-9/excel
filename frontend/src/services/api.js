import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:5001/api' // ✅ hardcoded backend port
    : 'https://excelanalytics-ciws.onrender.com',
  withCredentials: true,
});

export default api;
