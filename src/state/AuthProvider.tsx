import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface CompanyProfile {
  name: string;
  industry?: string;
  contactName: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface Session {
  token: string;
  userId: string;
  companyId: string;
  expiresAt: number;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextValue {
  session: Session | null;
  company: CompanyProfile | null;
  isAuthenticated: boolean;
  startLogin: (phone: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  verifyResetCode: (email: string, code: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  completeProfile: (profile: CompanyProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [company, setCompany] = useState<CompanyProfile | null>(null);

  const startLogin = useCallback(async (_phone: string) => {
    await new Promise((r) => setTimeout(r, 300));
  }, []);

  const verifyOtp = useCallback(async (_code: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setSession({
      token: 'mock-token',
      userId: 'user-1',
      companyId: 'company-1',
      expiresAt: Date.now() + 1000 * 60 * 60 * 24,
    });
  }, []);

  const loginWithPassword = useCallback(async (_email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setSession({
      token: 'mock-token',
      userId: 'user-1',
      companyId: 'company-1',
      expiresAt: Date.now() + 1000 * 60 * 60 * 24,
    });
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    await new Promise((r) => setTimeout(r, 300));
    setSession({
      token: 'mock-token',
      userId: 'user-1',
      companyId: 'company-1',
      expiresAt: Date.now() + 1000 * 60 * 60 * 24,
    });
    setCompany((prev) => ({
      name: prev?.name ?? '',
      contactName: input.fullName,
      phone: input.phone,
      email: input.email,
    }));
  }, []);

  const requestPasswordReset = useCallback(async (_email: string) => {
    await new Promise((r) => setTimeout(r, 300));
  }, []);

  const verifyResetCode = useCallback(async (_email: string, _code: string) => {
    await new Promise((r) => setTimeout(r, 300));
  }, []);

  const resetPassword = useCallback(async (_newPassword: string) => {
    await new Promise((r) => setTimeout(r, 300));
  }, []);

  const completeProfile = useCallback((profile: CompanyProfile) => {
    setCompany(profile);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    setCompany(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      company,
      isAuthenticated: Boolean(session),
      startLogin,
      verifyOtp,
      loginWithPassword,
      register,
      requestPasswordReset,
      verifyResetCode,
      resetPassword,
      completeProfile,
      logout,
    }),
    [
      session,
      company,
      startLogin,
      verifyOtp,
      loginWithPassword,
      register,
      requestPasswordReset,
      verifyResetCode,
      resetPassword,
      completeProfile,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook co-location is the established pattern for state providers in this codebase
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
