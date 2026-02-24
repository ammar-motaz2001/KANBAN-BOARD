'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/theme/theme';
import { ThemeContextProvider, useThemeContext } from './ThemeContext';

interface ThemeRegistryProps {
  children: React.ReactNode;
}

/**
 * Inner component that uses theme context to provide Material UI theme
 * 
 * @param props - Component props
 * @param props.children - Child components to wrap with theme provider
 * @returns JSX element wrapping children with ThemeProvider
 */
function ThemedContent({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeContext();
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

/**
 * Theme registry component
 * 
 * Wraps the application with Material UI theme provider and CssBaseline.
 * Integrates with ThemeContext to provide dynamic theme switching between light and dark modes.
 * 
 * @param props - Component props
 * @param props.children - Child components to wrap with theme registry
 * @returns JSX element wrapping children with theme providers
 */
export function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <ThemeContextProvider>
      <ThemedContent>{children}</ThemedContent>
    </ThemeContextProvider>
  );
}
