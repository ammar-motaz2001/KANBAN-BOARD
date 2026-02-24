'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import type { Task, TaskPriority } from '@/types/task.types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const PRIORITY_COLORS: Record<TaskPriority, { bg: string; color: string }> = {
  high: { bg: '#dc2626', color: '#ffffff' },
  medium: { bg: '#ea580c', color: '#ffffff' },
  low: { bg: '#6b7280', color: '#ffffff' },
};

/**
 * Individual task card component with drag-and-drop support
 * 
 * This is a presentational component that displays a single task card.
 * It supports drag-and-drop functionality and includes edit/delete actions.
 * 
 * @param props - Component props
 * @param props.task - The task data to display
 * @param props.onEdit - Callback function when edit button is clicked
 * @param props.onDelete - Callback function when delete button is clicked
 * @returns JSX element representing a task card
 */
export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priority = task.priority || 'low';
  const priorityColor = PRIORITY_COLORS[priority];

  return (
    <Card
      ref={setNodeRef}
      style={style}
      elevation={isDragging ? 8 : 2}
      sx={{
        mb: 2,
        width: '100%',
        minHeight: '140px',
        height: 'auto',
        cursor: isDragging ? 'grabbing' : 'grab',
        borderRadius: 2.5,
        border: '1px solid',
        borderColor: isDragging ? 'primary.main' : 'divider',
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 4,
          height: '100%',
          bgcolor: priorityColor.bg,
          opacity: 0.3,
          transition: 'opacity 0.2s',
        },
        '&:hover': {
          boxShadow: 3,
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <CardContent
        {...attributes}
        {...listeners}
        sx={{
          p: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          cursor: isDragging ? 'grabbing' : 'grab',
          '&:last-child': { pb: 2 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, flex: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0, pr: 1 }}>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                fontWeight: 600,
                fontSize: '0.95rem',
                mb: 1,
                lineHeight: 1.4,
                wordBreak: 'break-word',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {task.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.875rem',
                lineHeight: 1.5,
                mb: 1.5,
                wordBreak: 'break-word',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {task.description || 'No description'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flexShrink: 0 }}>
            <IconButton
              size="small"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onEdit(task);
              }}
              onMouseDown={e => e.stopPropagation()}
              aria-label="Edit task"
              sx={{
                p: 0.75,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(task.id);
              }}
              onMouseDown={e => e.stopPropagation()}
              aria-label="Delete task"
              color="error"
              sx={{
                p: 0.75,
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 'auto' }}>
          <Chip
            label={priority.toUpperCase()}
            size="small"
            sx={{
              bgcolor: priorityColor.bg,
              color: priorityColor.color,
              fontWeight: 600,
              fontSize: '0.7rem',
              height: 22,
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
