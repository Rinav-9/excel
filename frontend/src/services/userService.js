import api from './api';

const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/auth/profile', profileData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
};

const deleteUpload = async (uploadId) => {
  try {
    const response = await api.delete(`/upload/${uploadId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete upload:', error);
    throw error;
  }
};

export default {
  updateProfile,
  deleteUpload,
};
