import { useState, useEffect } from 'react';
import { useDreamsContext } from '../hooks/useDreamsContexts';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function LogDreamForm({
  open,
  onClose,
  initialData = {},
  onSubmit,
  formTitle = 'Log Dream',
  submitLabel = 'Save',
}) {
  const { dispatch } = useDreamsContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState('');
  const [error, setError] = useState(null);

  // Populate fields when editing
  useEffect(() => {
    if (open && initialData && Object.keys(initialData).length > 0) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setMood(initialData.mood);
    }

    if (open && !initialData) {
      // Reset for create form
      setTitle('');
      setDescription('');
      setMood('');
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dreamEntry = { title, description, mood };

    if (onSubmit) {
      const result = await onSubmit(dreamEntry);
      if (result?.error) return setError(result.error);
      onClose();
      return;
    }

    //  Create handler
    const response = await fetch('http://localhost:4000/api/dreams', {
      method: 'POST',
      body: JSON.stringify(dreamEntry),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) setError(data.error);
    if (response.ok) {
      setTitle('');
      setDescription('');
      setMood('');
      setError(null);
      dispatch({ type: 'CREATE_DREAMS_ENTRY', payload: data });
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='log-dream-form'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Box
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          width: '90%',
          maxWidth: 500,
          boxShadow: 8,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 4px 20px rgba(106, 27, 154, 0.08)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Typography variant='h6' fontWeight={600} letterSpacing={0.5}>
                {formTitle}
              </Typography>

              <TextField
                label='Title'
                variant='outlined'
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ bgcolor: '#fff', borderRadius: 2 }}
              />

              <TextField
                label='Description'
                variant='outlined'
                fullWidth
                multiline
                minRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ bgcolor: '#fff', borderRadius: 2 }}
              />

              <TextField
                label='Mood'
                variant='outlined'
                fullWidth
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                sx={{ bgcolor: '#fff', borderRadius: 2 }}
              />

              <Button
                type='submit'
                variant='contained'
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: '#6a1b9a',
                  borderRadius: '999px',
                  textTransform: 'none',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  px: 3,
                  py: 1.2,
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 12px rgba(106, 27, 154, 0.2)',
                  '&:hover': {
                    bgcolor: '#5c1787',
                    boxShadow: '0 6px 16px rgba(106, 27, 154, 0.25)',
                  },
                }}
              >
                {submitLabel}
              </Button>

              {error && (
                <Typography color='error' variant='body2'>
                  {error}
                </Typography>
              )}
            </Stack>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
}

export default LogDreamForm;
