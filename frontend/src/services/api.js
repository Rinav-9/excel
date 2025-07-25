import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost'
    ? 'https://excelanalytics-ciws.onrender.com',
    : 'http://localhost:5001/api' // ✅ hardcoded backend port
  withCredentials: true,
});

export default api;
