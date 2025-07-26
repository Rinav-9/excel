import api from './api';

const signup = (data) => api.post('/api/auth/signup', data);
const login = (data) =>
  api.post('/api/auth/login', data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
const sendOtp = (email) => api.post('/api/auth/send-otp', { email });
const verifyOtp = (email, otp) => api.post('/api/auth/verify-otp', { email, otp });
const forgotPassword = (email) => api.post('/api/auth/forgot-password', { email });
const resetPassword = (data) => api.post('/api/auth/reset-password', data);
const logout = () => api.post('/api/auth/logout');

export default {
  signup,
  login,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  logout,
};
