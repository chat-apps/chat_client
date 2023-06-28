import { Box, Divider, ListItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Avatar from '../Avatar';
import { FiberManualRecord, GraphicEqOutlined } from '@mui/icons-material';

export interface RoomListInterface {
  ID: number;
  userName: string;
  status: boolean;
  userID: number;
  lastMessage?: string;
  handleOnClick: (arg1: number) => void;
}

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

const ChatList = ({ ID, userName, lastMessage, handleOnClick, status }: RoomListInterface) => {
  const classes = useStyles();

  const handleClick = () => {
      handleOnClick(ID)
  }

  return (
    <ListItem button onClick={handleClick} className={classes.container}>
      <Box className={classes.box}>
        <Avatar name={userName} />
        <Box>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            {status && <FiberManualRecord className={classes.activeIcon} />}
            <Typography variant="body1" style={{ color: '#fff', marginBottom: 0 }}>
              {userName}
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
