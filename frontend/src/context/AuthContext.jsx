import { useState } from 'react';
import api from '../services/api';
import { AuthContext } from './auth';

function readUser() {
  try {
    return localStorage.getItem('authToken')
      ? JSON.parse(localStorage.getItem('authUser')) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [loading, setLoading] = useState(false);

  const authenticate = async (mode, credentials) => {
    setLoading(true);
    try {
      const result = await api.auth[mode](credentials);
      if (!result.success || !result.token) throw new Error(result.message || 'Authentication failed');
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('authUser', JSON.stringify(result.user));
      setUser(result.user);
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = (email, password) => authenticate('login', { email, password });
  const register = (name, email, password) => {
    const [first_name, ...lastName] = name.trim().split(/\s+/);
    return authenticate('register', {
      email, password, confirm_password: password,
      first_name, last_name: lastName.join(' '),
    });
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
