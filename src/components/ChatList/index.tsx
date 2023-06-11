import { Box, Divider, ListItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Avatar from '../Avatar';
import { FiberManualRecord, GraphicEqOutlined } from '@mui/icons-material';
import { ChatListPropsInterface } from '../types';

const useStyles = makeStyles({
  container: {
    marginBottom: 8,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeIcon: {
    width: 10,
    height: 10,
    background: '#03cc3f',
    marginRight: 20,
    borderRadius: '50%',
  },
});

const ChatList = ({ name, lastMessage, status, onClick }: ChatListPropsInterface) => {
  const classes = useStyles();

  const handleOnClick = () => {
    onClick({ username: name, status: status });
  };

  return (
    <ListItem button onClick={handleOnClick} className={classes.container}>
      <Box className={classes.box}>
        <Avatar name={name} />
        <Box>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            {status && <FiberManualRecord className={classes.activeIcon} />}
            <Typography variant="body1" style={{ color: '#fff', marginBottom: 0 }}>
              {name}
            </Typography>
          </Box>
          <Typography variant="body2" style={{ color: '#969696' }}>
            {lastMessage}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ bgcolor: '#515151' }} />
    </ListItem>
  );
};

export default ChatList;
