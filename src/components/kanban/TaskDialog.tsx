'use client';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useTaskDialog } from '@/hooks/use-task-dialog';
import type { Task, TaskColumn, TaskPriority, CreateTaskInput, UpdateTaskInput } from '@/types/task.types';

interface TaskDialogProps {
  open: boolean;
  task?: Task | null;
  onClose: () => void;
  onSave: (data: CreateTaskInput | UpdateTaskInput) => void;
}

const COLUMNS: { value: TaskColumn; label: string }[] = [
  { value: 'backlog', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'In Review' },
  { value: 'done', label: 'Done' },
];

const PRIORITIES: { value: TaskPriority; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

/**
 * Dialog component for creating and editing tasks
 * 
 * This is a presentational component that displays a form dialog for task creation/editing.
 * All form state management is handled by the useTaskDialog custom hook.
 * 
 * @param props - Component props
 * @param props.open - Whether the dialog is open
 * @param props.task - The task to edit (null for new task)
 * @param props.onClose - Callback function when dialog is closed
 * @param props.onSave - Callback function when task is saved
 * @returns JSX element representing the task dialog
 */
export function TaskDialog({ open, task, onClose, onSave }: TaskDialogProps) {
  const {
    title,
    description,
    column,
    priority,
    setTitle,
    setDescription,
    setColumn,
    setPriority,
    handleSave,
    reset,
  } = useTaskDialog({ task, open });

  const handleCloseDialog = () => {
    reset();
    onClose();
  };

  const handleSaveClick = () => {
    const data = handleSave();
    if (data) {
      onSave(data);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={e => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          margin="dense"
          label="Column"
          fullWidth
          variant="outlined"
          value={column}
          onChange={e => setColumn(e.target.value as TaskColumn)}
          sx={{ mb: 2 }}
        >
          {COLUMNS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          margin="dense"
          label="Priority"
          fullWidth
          variant="outlined"
          value={priority}
          onChange={e => setPriority(e.target.value as TaskPriority)}
        >
          {PRIORITIES.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSaveClick} variant="contained" disabled={!title.trim()}>
          {task ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
