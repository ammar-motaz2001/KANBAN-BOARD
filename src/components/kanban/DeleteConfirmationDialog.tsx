'use client';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WarningIcon from '@mui/icons-material/Warning';
import { DialogContentText } from '@mui/material';

interface DeleteConfirmationDialogProps {
  open: boolean;
  taskTitle?: string;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Professional delete confirmation dialog component
 * 
 * This is a presentational component that displays a confirmation dialog
 * before deleting a task. It provides a professional UI with warning icon
 * and task information.
 * 
 * @param props - Component props
 * @param props.open - Whether the dialog is open
 * @param props.taskTitle - The title of the task to be deleted
 * @param props.onClose - Callback function when dialog is closed
 * @param props.onConfirm - Callback function when deletion is confirmed
 * @returns JSX element representing the delete confirmation dialog
 */
export function DeleteConfirmationDialog({
  open,
  taskTitle,
  onClose,
  onConfirm,
}: DeleteConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'error.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'error.contrastText',
            }}
          >
            <WarningIcon sx={{ fontSize: 28 }} />
          </Box>
          <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
            Delete Task
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2, fontSize: '0.95rem', color: 'text.primary' }}>
          Are you sure you want to delete this task? This action cannot be undone.
        </DialogContentText>
        {taskTitle && (
          <Box
            sx={{
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
              Task Title:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {taskTitle}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              bgcolor: 'error.dark',
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
