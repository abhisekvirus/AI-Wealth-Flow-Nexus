import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { generateAIPlan } from '../utils/aiEngine';
import type { UserProfile, FinancialPlan } from '../utils/aiEngine';

interface UserContextType {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  plan: FinancialPlan | null;
  isProcessing: boolean;
  login: () => void;
  logout: () => void;
  submitProfile: (profile: UserProfile) => Promise<void>;
  resetProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<FinancialPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const login = () => setIsAuthenticated(true);
  
  const logout = () => {
    setIsAuthenticated(false);
    setProfile(null);
    setPlan(null);
  };

  const submitProfile = async (newProfile: UserProfile) => {
    setIsProcessing(true);
    // Simulate AI processing delay (fetching from "Google" and calculating)
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const newPlan = generateAIPlan(newProfile);
    setProfile(newProfile);
    setPlan(newPlan);
    setIsProcessing(false);
  };

  const resetProfile = () => {
    setProfile(null);
    setPlan(null);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, profile, plan, isProcessing, login, logout, submitProfile, resetProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
