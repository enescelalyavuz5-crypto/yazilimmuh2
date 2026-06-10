import axiosClient from './axiosClient';

export const aliApi = {
  enrollCourse: async (userId: string, courseId: string) => {
    const response = await axiosClient.post(`/users/${userId}/courses`, { courseId });
    return response.data;
  },
  addExamResult: async (userId: string, data: any) => {
    const response = await axiosClient.post(`/users/${userId}/exam-results`, data);
    return response.data;
  },
  getExams: async (params?: any) => {
    const response = await axiosClient.get('/exams', { params });
    return response.data;
  },
  updateExamResult: async (userId: string, examResultId: string, data: any) => {
    const response = await axiosClient.put(`/users/${userId}/exam-results/${examResultId}`, data);
    return response.data;
  },
  deleteUser: async (userId: string) => {
    const response = await axiosClient.delete(`/users/${userId}`);
    return response.data;
  },
  deleteComment: async (lessonId: string, commentId: string) => {
    const response = await axiosClient.delete(`/lessons/${lessonId}/comments/${commentId}`);
    return response.data;
  },
  getCertificates: async (userId: string, params?: any) => {
    const response = await axiosClient.get(`/users/${userId}/certificates`, { params });
    return response.data;
  },
  aiPractice: async (data: any) => {
    const response = await axiosClient.post('/ai/practice', data);
    return response.data;
  }
};
