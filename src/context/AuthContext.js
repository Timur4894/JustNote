import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setIsAuthorized(!!token);
  };

  const login = async (token) => {
    await AsyncStorage.setItem('userToken', token);
    setIsAuthorized(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthorized(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
