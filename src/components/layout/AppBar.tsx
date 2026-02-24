'use client';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function AppBarLayout() {
  return (
    <MuiAppBar position="static" elevation={0}>
      <Toolbar disableGutters sx={{ px: 2 }}>
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Kanban ToDo Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
