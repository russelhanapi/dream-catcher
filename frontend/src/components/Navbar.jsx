import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Navbar() {
  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        py: 1.5,
      }}
    >
      <Container maxWidth='md'>
        <Link
          to='/'
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Stack direction='row' spacing={1.5} alignItems='center'>
            <BedtimeIcon sx={{ color: '#6a1b9a', fontSize: 28 }} />
            <Typography
              variant='h6'
              component='div'
              sx={{
                fontWeight: 600,
                letterSpacing: '0.5px',
                color: '#2e2e2e',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#6a1b9a',
                },
              }}
            >
              Dream Catcher
            </Typography>
          </Stack>
        </Link>
      </Container>
    </AppBar>
  );
}
export default Navbar;
