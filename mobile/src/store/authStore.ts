import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  englishLevel: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: async (token, user) => {
    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
    set({ token, user });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userInfo');
    set({ token: null, user: null });
  },
  restoreToken: async () => {
    const token = await SecureStore.getItemAsync('userToken');
    const userInfoString = await SecureStore.getItemAsync('userInfo');
    if (token && userInfoString) {
      set({ token, user: JSON.parse(userInfoString) });
    } else {
      set({ token: null, user: null });
    }
  },
}));
