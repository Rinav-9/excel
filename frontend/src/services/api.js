import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:5001/api' // ✅ hardcoded backend port
    : 'https://excel-analytics-backend-sigma.onrender.com/api',
  withCredentials: true,
});

export default api;
