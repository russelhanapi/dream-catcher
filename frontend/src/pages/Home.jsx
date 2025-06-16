import { useEffect, useState } from 'react';
import { useDreamsContext } from '../hooks/useDreamsContexts';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LogDreamForm from '../components/LogDreamForm';
import DreamEntry from '../components/DreamEntry';
import AddEntryButton from '../components/AddEntryButton';

function Home() {
  const { dreams, dispatch } = useDreamsContext();
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const fetchDreamEntries = async () => {
      const response = await fetch('http://localhost:4000/api/dreams');
      const data = await response.json();
      if (response.ok) dispatch({ type: 'SET_DREAMS_ENTRY', payload: data });
    };
    fetchDreamEntries();
  }, []);

  return (
    <>
      <Toolbar />
      <Container maxWidth='md'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Stack
            direction='column'
            spacing={1}
            marginBottom={3}
            justifyContent='center'
          >
            <Typography
              variant='h5'
              component='h1'
              sx={{ fontWeight: 600, letterSpacing: 0.5, color: '#f3e8ff' }}
            >
              Your Dreams
            </Typography>
            <Typography variant='body2' sx={{ color: '#decdf0' }}>
              Write. Remember. Revisit.
            </Typography>
          </Stack>
          <AddEntryButton onClick={() => setFormOpen((prev) => !prev)} />
        </Stack>
        <Stack direction='column' spacing={2}>
          {dreams && dreams.length > 0 ? (
            dreams.map((dreamEntry) => (
              <DreamEntry dreamEntry={dreamEntry} key={dreamEntry._id} />
            ))
          ) : (
            <Typography variant='body2' color='text.secondary'>
              There's nothing here...
            </Typography>
          )}
        </Stack>
        {formOpen && (
          <LogDreamForm open={formOpen} onClose={() => setFormOpen(false)} />
        )}
      </Container>
    </>
  );
}

export default Home;
