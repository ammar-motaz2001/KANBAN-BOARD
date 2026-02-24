'use client';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext } from './ThemeContext';

/**
 * Theme toggle button component
 * 
 * This is a presentational component that displays a button to toggle between
 * light and dark themes. It uses the ThemeContext to manage theme state.
 * 
 * @returns JSX element representing the theme toggle button
 */
export function ThemeToggle() {
  const { mode, toggleMode } = useThemeContext();

  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={toggleMode}
        sx={{
          color: 'text.primary',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
        aria-label="Toggle theme"
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
