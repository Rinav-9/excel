import api from './api';

const getUploadHistory = async () => {
  try {
    const response = await api.get('/history'); // withCredentials works here
    return response.data;
  } catch (error) {
    console.error('Failed to fetch upload history:', error);
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
  getUploadHistory,
  deleteUpload,
};
