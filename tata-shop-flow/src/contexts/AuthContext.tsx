import { createContext, useContext, useState, ReactNode } from 'react';

type Customer = {
  customerId: string;
  name: string;
  phone: string;
  email?: string;
  preApprovedLimit?: number;
  creditScore?: number;
};

type AuthContextType = {
  customer: Customer | null;
  login: (email: string, phone: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  const login = async (email: string, phone: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8000'}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Login failed' };
      }
      setCustomer(data.customer);
      return { success: true };
    } catch (err) {
      console.error('Auth login error', err);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    setCustomer(null);
  };

  return (
    <AuthContext.Provider value={{ customer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
