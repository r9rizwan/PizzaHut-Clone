import {
  addUserToPresistentStorage,
  getUserAuthStatusFromPresistentStorage,
  removeUserFromPresistentStorage,
} from "@/utils";
import { AuthContext } from "../contexts";
import { useState } from "react";

export const AuthProvider = ({ children }) => {
  const presistedUser = getUserAuthStatusFromPresistentStorage();
  const [user, setUser] = useState(presistedUser.userData); // get from persistent storage on initialization.
  const [token, setToken] = useState(presistedUser.token); // get from persistent storage on initialization.
  const [isAuthenticated, setIsAuthenticated] = useState(
    presistedUser.isAuthenticated
  ); // get from persistent storage on initialization.

  // Function to log in the user
  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);

    // add to some persistent storage.
    addUserToPresistentStorage({ user: user, token });
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    // remove from persistent storage
    removeUserFromPresistentStorage();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
