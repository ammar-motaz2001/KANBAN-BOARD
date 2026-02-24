'use client';

import {
  DndContext,
  DragOverlay,
  closestCorners,
} from '@dnd-kit/core';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { KanbanColumn } from './KanbanColumn';
import { TaskDialog } from './TaskDialog';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { TaskCard } from './TaskCard';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useKanbanBoard } from '@/hooks/use-kanban-board';
import type { TaskColumn } from '@/types/task.types';

const COLUMNS: { id: TaskColumn; title: string }[] = [
  { id: 'backlog', title: 'TO DO' },
  { id: 'in_progress', title: 'IN PROGRESS' },
  { id: 'review', title: 'IN REVIEW' },
  { id: 'done', title: 'DONE' },
];

/**
 * Main Kanban board component with drag-and-drop functionality
 * 
 * This is a presentational component that handles the UI layout and rendering.
 * All business logic is handled by the useKanbanBoard custom hook.
 * 
 * @returns JSX element representing the Kanban board
 */
export function KanbanBoard() {
  const {
    isLoading,
    searchQuery,
    dialogOpen,
    deleteDialogOpen,
    selectedTask,
    taskToDelete,
    activeTask,
    tasksByColumn,
    sensors,
    setSearchQuery,
    handleDragStart,
    handleDragEnd,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleConfirmDelete,
    handleSaveTask,
    handleCloseDialog,
    handleCloseDeleteDialog,
  } = useKanbanBoard();

  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Loading tasks...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 3,
          maxWidth: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <DashboardIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              letterSpacing: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            KANBAN BOARD
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: { xs: '100%', sm: 300 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 2,
                },
                '&.Mui-focused': {
                  boxShadow: 3,
                },
              },
            }}
          />
          <ThemeToggle />
        </Box>
      </Box>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Grid
          container
          spacing={3}
          sx={{
            width: '100%',
            margin: 0,
            display: 'flex',
            '& .MuiGrid-item': {
              paddingLeft: { xs: '12px', sm: '24px' },
              paddingTop: { xs: '12px', sm: '24px' },
              display: 'flex',
            },
          }}
        >
          {COLUMNS.map(column => (
            <Grid
              key={column.id}
              size={{ xs: 12, sm: 6, lg: 3 }}
              sx={{
                display: 'flex',
                minHeight: { xs: 'auto', lg: 'calc(100vh - 200px)' },
              }}
            >
              <KanbanColumn
                columnId={column.id}
                title={column.title}
                tasks={tasksByColumn[column.id] || []}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onAddTask={handleAddTask}
              />
            </Grid>
          ))}
        </Grid>

        <DragOverlay
          style={{
            cursor: 'grabbing',
          }}
        >
          {activeTask ? (
            <Box
              sx={{
                maxWidth: 320,
                transform: 'rotate(5deg)',
                opacity: 0.9,
                boxShadow: 8,
              }}
            >
              <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskDialog
        open={dialogOpen}
        task={selectedTask}
        onClose={handleCloseDialog}
        onSave={handleSaveTask}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        taskTitle={taskToDelete?.title}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
