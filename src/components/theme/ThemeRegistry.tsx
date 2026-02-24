'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/theme/theme';
import { ThemeContextProvider, useThemeContext } from './ThemeContext';

interface ThemeRegistryProps {
  children: React.ReactNode;
}

/**
 * Inner component that applies the theme based on context
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
 * Wraps the app with Material UI theme
 * Handles switching between light and dark modes
 */
export function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <ThemeContextProvider>
      <ThemedContent>{children}</ThemedContent>
    </ThemeContextProvider>
  );
}
