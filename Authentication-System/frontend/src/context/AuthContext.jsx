import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.me()
      .then((data) => { setUser(data.user); setJwt(data.jwt); })
      .catch(() => { setUser(null); setJwt(null); })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    jwt,
    loading,
    async login(payload) {
      const data = await api.login(payload);
      setUser(data.user); setJwt(data.jwt);
      return data;
    },
    async signup(payload) {
      const data = await api.signup(payload);
      setUser(data.user); setJwt(data.jwt);
      return data;
    },
    async logout() {
      await api.logout();
      setUser(null); setJwt(null);
    }
  }), [user, jwt, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
