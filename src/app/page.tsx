import Box from '@mui/material/Box';
import { KanbanBoard } from '@/components/kanban';

export default function Home() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <KanbanBoard />
    </Box>
  );
}
