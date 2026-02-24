'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TaskCard } from './TaskCard';
import { useKanbanColumn } from '@/hooks/use-kanban-column';
import type { Task, TaskColumn } from '@/types/task.types';

const COLUMN_COLORS: Record<TaskColumn, string> = {
  backlog: '#3b82f6', // Blue
  in_progress: '#f97316', // Orange
  review: '#a855f7', // Purple
  done: '#10b981', // Green
};

interface KanbanColumnProps {
  columnId: TaskColumn;
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onAddTask: (column: TaskColumn) => void;
  itemsPerPage?: number;
}

/**
 * Kanban column component with drop zone and task list
 * 
 * This is a presentational component that displays a single column in the Kanban board.
 * All pagination and scroll logic is handled by the useKanbanColumn custom hook.
 * 
 * @param props - Component props
 * @param props.columnId - The unique identifier for this column
 * @param props.title - Display title for the column
 * @param props.tasks - Array of tasks to display in this column
 * @param props.onEdit - Callback function when a task is edited
 * @param props.onDelete - Callback function when a task is deleted
 * @param props.onAddTask - Callback function when adding a new task
 * @param props.itemsPerPage - Number of items to display per page (default: 5)
 * @returns JSX element representing a Kanban column
 */
export function KanbanColumn({
  columnId,
  title,
  tasks,
  onEdit,
  onDelete,
  onAddTask,
  itemsPerPage = 5,
}: KanbanColumnProps) {
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: columnId,
  });

  const { displayedTasks, hasMore, displayCount, handleLoadMore, handleScroll } =
    useKanbanColumn({ tasks, itemsPerPage });

  const taskIds = displayedTasks.map(task => task.id);
  const columnColor = COLUMN_COLORS[columnId];

  return (
    <Paper
      elevation={isOver ? 8 : 2}
      sx={{
        p: 2.5,
        width: '100%',
        minHeight: 'calc(100vh - 200px)',
        height: '100%',
        maxHeight: 'calc(100vh - 200px)',
        backgroundColor: isOver ? `${columnColor}08` : 'background.paper',
        borderRadius: 3,
        border: `2px solid ${isOver ? columnColor : 'transparent'}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: columnColor,
          opacity: isOver ? 1 : 0.3,
          transition: 'opacity 0.3s',
        },
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: columnColor,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '0.75rem',
          }}
        >
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </Typography>
      </Box>

      <Box
        ref={setDroppableRef}
        onScroll={handleScroll}
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          pr: 0.5,
          minHeight: 0,
          position: 'relative',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(0,0,0,0.3)',
            },
          },
        }}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {displayedTasks.map(task => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              color: 'text.secondary',
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: isOver ? `2px dashed ${columnColor}` : '2px dashed transparent',
              borderRadius: 2,
              transition: 'all 0.2s',
            }}
          >
            <Typography variant="body2">
              {isOver ? 'Drop task here' : 'No tasks in this column'}
            </Typography>
          </Box>
        )}
        {hasMore && (
          <Button
            fullWidth
            variant="text"
            endIcon={<ExpandMoreIcon />}
            onClick={handleLoadMore}
            sx={{ mt: 1, mb: 2 }}
          >
            Load More ({tasks.length - displayCount} remaining)
          </Button>
        )}
      </Box>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => onAddTask(columnId)}
        fullWidth
        sx={{
          mt: 2,
          textTransform: 'none',
          borderRadius: 1.5,
          py: 1,
          borderColor: 'divider',
          flexShrink: 0,
          fontSize: '0.875rem',
          fontWeight: 400,
          '&:hover': {
            borderColor: columnColor,
            bgcolor: `${columnColor}08`,
          },
        }}
      >
        Add task
      </Button>
    </Paper>
  );
}
