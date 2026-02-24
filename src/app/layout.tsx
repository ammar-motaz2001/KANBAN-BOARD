import type { Metadata } from 'next';
import { ThemeRegistry } from '@/components/theme';
import { QueryProvider } from '@/components/providers/QueryProvider';
import Box from '@mui/material/Box';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kanban ToDo Dashboard',
  description: 'Kanban-style ToDo list application with drag-and-drop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ThemeRegistry>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
              <Box component="main" sx={{ flexGrow: 1, width: '100%', overflow: 'hidden' }}>
                {children}
              </Box>
            </Box>
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
