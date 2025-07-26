import React, { createContext, useContext, useState, useCallback } from "react";

// It's a good practice to export a custom hook to use the context
export const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Wrap functions in useCallback to memoize them
  const updateUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;