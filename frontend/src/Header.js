import React from 'react';
import { Typography, Container } from '@mui/material';

const Header = () => {
  return (
    <Container
      sx={{
        textAlign: 'center',
        marginTop: '40px',
        marginBottom: '20px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#4A90E2',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Birthday Reminder App
      </Typography>
    </Container>
  );
};

export default Header;
