import { createContext } from "react";

// Create the Auth Context
export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => null,
  logout: () => null,
});
