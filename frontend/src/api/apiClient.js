import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => apiClient.post('/users/register', data),
  login: (data) => apiClient.post('/users/login', data),
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
};

export const courseAPI = {
  getAllCourses: (filters) => apiClient.get('/courses', { params: filters }),
  getCourseDetail: (id) => apiClient.get(`/courses/${id}`),
  createCourse: (data) => apiClient.post('/courses', data),
  updateCourse: (id, data) => apiClient.put(`/courses/${id}`, data),
  deleteCourse: (id) => apiClient.delete(`/courses/${id}`),
  addSection: (id, data) => apiClient.post(`/courses/${id}/sections`, data),
  enrollCourse: (id) => apiClient.post(`/courses/${id}/enroll`),
  getMyCourses: () => apiClient.get('/courses/user/mycourses'),
};

export const adminAPI = {
  getAllUsers: () => apiClient.get('/admin/users'),
  getAllCourses: () => apiClient.get('/admin/courses'),
  updateUserRole: (id, data) => apiClient.put(`/admin/users/${id}/role`, data),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),
  publishCourse: (id, data) => apiClient.put(`/admin/courses/${id}/publish`, data),
  getStatistics: () => apiClient.get('/admin/stats/enrollments'),
};

export default apiClient;
