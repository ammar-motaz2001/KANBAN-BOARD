'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme context provider component
 * 
 * Provides theme mode state and toggle functionality to child components.
 * Persists theme preference in localStorage for user preference persistence.
 * 
 * @param props - Component props
 * @param props.children - Child components to wrap with theme context
 * @returns JSX element wrapping children with ThemeContext.Provider
 */
export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    // Load theme preference from localStorage
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    if (savedMode === 'light' || savedMode === 'dark') {
      setMode(savedMode);
    }
  }, []);

  const toggleMode = () => {
    setMode(prev => {
      const newMode = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access theme context
 * 
 * Provides access to theme mode and toggle function.
 * Must be used within a ThemeContextProvider.
 * 
 * @returns Theme context value containing mode and toggleMode function
 * @throws Error if used outside ThemeContextProvider
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within ThemeContextProvider');
  }
  return context;
}
