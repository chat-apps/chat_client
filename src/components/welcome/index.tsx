/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { WelcomePng } from '../../assets';

const Welcome = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#159bc060',
        padding: '24px',
      }}
    >
      <img
        src={WelcomePng}
        alt="Chat App Image"
        style={{
          height: '570px',
          marginBottom: '16px',
        }}
      />
      <Typography variant="h4" color="primary">
        Welcome to the Chat App!
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Start a conversation and connect with others.
      </Typography>
    </Box>
  );
};

export default Welcome;
