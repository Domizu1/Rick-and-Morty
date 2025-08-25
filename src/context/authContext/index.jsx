import {jwtDecode} from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

export const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const token = currentUser?.accessToken;

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const isExpired = decoded?.exp * 1000 < Date.now();
      if (isExpired) {
        logout();
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: currentUser?.email,
            accessToken: currentUser?.accessToken,
          })
        );
      }
    }
  }, [currentUser, token]);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    auth.signOut();
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
