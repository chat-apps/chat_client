import React from 'react'
import { AvatarPropsInterface, LoaderPropsInterface } from '../types'
import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = ({ isLoading }: LoaderPropsInterface) => {
  const classes = useStyles()


  return (
    <React.Fragment>
      {isLoading ? (
        <Box className={classes.container}>
          <CircularProgress />
        </Box>
        )
      : null  
      }
    </React.Fragment>
  )
}

export default Loader