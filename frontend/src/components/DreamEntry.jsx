import { useState } from 'react';
import { useDreamsContext } from '../hooks/useDreamsContexts';
import { formatDistanceToNow, format } from 'date-fns';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import LogDreamForm from './LogDreamForm';

function DreamEntry({ dreamEntry }) {
  const { dispatch } = useDreamsContext();
  const [editOpen, setEditOpen] = useState(false);

  // Delete handler
  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/api/dreams/${dreamEntry._id}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_DREAMS_ENTRY', payload: data });
    }
  };

  // Edi handler
  const handleEdit = async (updatedData) => {
    const response = await fetch(
      `http://localhost:4000/api/dreams/${dreamEntry._id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(updatedData),
      }
    );
    const data = await response.json();
    if (!response.ok) return { error: data.error };
    dispatch({ type: 'UPDATE_DREAMS_ENTRY', payload: data });
    return {};
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          backgroundColor: 'rgb(243, 232, 255,0.95)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0 4px 20px rgba(106, 27, 154, 0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 24px rgba(106, 27, 154, 0.15)',
          },
        }}
      >
        <CardContent>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography
              variant='body1'
              fontWeight={600}
              sx={{ letterSpacing: '0.3px', color: '#2e2e2e' }}
            >
              {dreamEntry.title}
            </Typography>

            <Stack direction='row' spacing={1}>
              <IconButton
                onClick={() => setEditOpen(true)}
                size='small'
                sx={{
                  color: '#6a1b9a',
                  '&:hover': { backgroundColor: 'rgba(106, 27, 154, 0.08)' },
                }}
              >
                <EditIcon fontSize='small' />
              </IconButton>

              <IconButton
                onClick={handleDelete}
                size='small'
                sx={{
                  color: '#6a1b9a',
                  '&:hover': {
                    backgroundColor: 'rgba(106, 27, 154, 0.08)',
                    color: 'error.dark',
                  },
                }}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Stack>
          </Stack>

          <Typography
            variant='body2'
            sx={{ color: 'text.secondary', mt: 0.5, whiteSpace: 'pre-line' }}
          >
            {dreamEntry.description}
          </Typography>
        </CardContent>

        <CardContent sx={{ pt: 1.5 }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Stack direction='row' spacing={1}>
              <Typography variant='body2' fontWeight={500}>
                Mood:
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: '#6a1b9a', fontWeight: 500 }}
              >
                {dreamEntry.mood}
              </Typography>
            </Stack>

            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {`${formatDistanceToNow(new Date(dreamEntry.createdAt), {
                addSuffix: true,
              })} • ${format(new Date(dreamEntry.createdAt), 'MM/dd/yyyy')}`}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <LogDreamForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialData={dreamEntry}
        onSubmit={handleEdit}
        formTitle='Edit Dream'
        submitLabel='Update'
      />
    </>
  );
}

export default DreamEntry;
