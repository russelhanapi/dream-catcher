import { Button, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

function AddEntryButton({ onClick }) {
  return (
    <Button
      variant='contained'
      startIcon={<AddRoundedIcon />}
      onClick={onClick}
      sx={{
        backgroundColor: '#6a1b9a',
        color: '#fff',
        borderRadius: '999px',
        border: '1px solid transparent',
        textTransform: 'none',
        px: { xs: 1.5, md: 3 },
        py: 1.2,
        minWidth: 'auto',
        '& .MuiButton-startIcon': {
          margin: { xs: 0 },
        },
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#6a1b9a',
          borderColor: '#6a1b9a',
        },
      }}
    >
      <Typography
        sx={{
          display: { xs: 'none', md: 'inline' },
          fontSize: '0.95rem',
        }}
      >
        Log Dream
      </Typography>
    </Button>
  );
}

export default AddEntryButton;
