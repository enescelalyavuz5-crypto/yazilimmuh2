import axiosClient from './axiosClient';

export const enesApi = {
  login: async (data: any) => {
    const response = await axiosClient.post('/auth/login', data);
    return response.data;
  },
  register: async (data: any) => {
    const response = await axiosClient.post('/auth/register', data);
    return response.data;
  },
  updateProfile: async (userId: string, data: any) => {
    const response = await axiosClient.put(`/users/${userId}/profile`, data);
    return response.data;
  },
  updateStudyGoal: async (userId: string, dailyGoalMinutes: number) => {
    const response = await axiosClient.put(`/users/${userId}/study-goal`, { dailyGoalMinutes });
    return response.data;
  },
  getWords: async (params?: any) => {
    const response = await axiosClient.get('/words', { params });
    return response.data;
  },
  addFavoriteWord: async (userId: string, wordId: string) => {
    const response = await axiosClient.post(`/users/${userId}/favorite-words`, { wordId });
    return response.data;
  },
  removeFavoriteWord: async (userId: string, wordId: string) => {
    const response = await axiosClient.delete(`/users/${userId}/favorite-words/${wordId}`);
    return response.data;
  },
  getLessons: async (params?: any) => {
    const response = await axiosClient.get('/lessons', { params });
    return response.data;
  },
  getStatistics: async (userId: string) => {
    const response = await axiosClient.get(`/users/${userId}/statistics`);
    return response.data;
  }
};
