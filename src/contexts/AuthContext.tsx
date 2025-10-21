import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Customer {
  customerId: string;
  name: string;
  phone: string;
  email: string;
  preApprovedLimit: number;
  creditScore: number;
}

interface AuthContextType {
  customer: Customer | null;
  login: (email: string, phone: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const savedCustomer = localStorage.getItem('customer');
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
  }, []);

  const login = async (email: string, phone: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      });

      const data = await response.json();

      if (data.success) {
        setCustomer(data.customer);
        localStorage.setItem('customer', JSON.stringify(data.customer));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem('customer');
  };

  return (
    <AuthContext.Provider value={{ customer, login, logout, isAuthenticated: !!customer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
