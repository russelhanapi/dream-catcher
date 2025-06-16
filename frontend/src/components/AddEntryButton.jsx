import { Button, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

function AddEntryButton({ onClick }) {
  return (
    <Button
      variant='contained'
      startIcon={<AddRoundedIcon />}
      onClick={onClick}
      sx={{
        backgroundColor: '#f3e8ff',
        color: '#311249',
        borderRadius: '999px',
        border: '1px solid transparent',
        textTransform: 'none',
        px: { xs: 1.5, md: 3 },
        py: 1.2,
        minWidth: 'auto',
        transition: 'all 0.25s ease',
        boxShadow: '0 3px 8px rgba(106, 27, 154, 0.15)',
        '& .MuiButton-startIcon': {
          margin: { xs: 0 },
          marginRight: { md: 1 },
          marginLeft: { md: 0 },
        },
        '&:hover': {
          backgroundColor: '#6a1b9a',
          color: '#f3e8ff',
        },
      }}
    >
      <Typography
        sx={{
          display: { xs: 'none', md: 'inline' },
          fontSize: '1rem',
          fontWeight: 500,
          color: '#4a235a',
          letterSpacing: '0.5px',
          transition: 'color 0.3s ease',
          '&:hover': {
            color: '#f3e8ff',
          },
        }}
      >
        Log Dream
      </Typography>
    </Button>
  );
}

export default AddEntryButton;
