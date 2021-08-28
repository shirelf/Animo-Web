import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: undefined,
  token: undefined,
  login: (uid: string, token: string, expirationDate?: any) => { },
  logout: () => {
  },
  updateStatus: async (online:boolean) => {},
  user: {},
  userRole: {},
  fetchUser: async () => {}
});
