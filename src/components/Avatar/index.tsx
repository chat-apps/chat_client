import React from 'react'
import { AvatarPropsInterface } from '../types'
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: '50%',
    marginRight: 10,
    background: '#6193ef',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
});

const Avatar = ({ name }: AvatarPropsInterface) => {
  const classes = useStyles()
  const avatar = name.split(' ').map((value) => value.charAt(0).toUpperCase()).join('');
  return <Box className={classes.avatar}>{avatar}</Box>
}

export default Avatar