import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { removeItemFromLocalStorage } from '../../utils';
import ChatBox from '../../components/ChatBox/index';
import { useUserContext } from '../../context/user.context';
import { getAllUsers } from '../../helpers/login.helper';
import { toast } from 'react-toastify';
import { errorToast } from '../../utils/toast';
import ChatList from '../../components/ChatList';
import Loader from '../../components/Loader';
import { RoomPropsInterface } from '../../components/types';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    maxHeight: '100vh',
  },
  row: {
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
    height: '100vh'
  },
  col4: {
    background: '#141f52',
    width: '20%',
    padding: '20px 0',
    overflowY: 'scroll',
    position: 'relative'
  },
  col6: {
    background: '#f6f6f6',
    width: '80%',
    padding: '0 24px',
    height: '100vh'
  },
  logoutButton: {
    background: 'black',
    padding: '20px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const ChatPage = () => {
  const classes = useStyles();
  const { state } = useUserContext()
  const [ loading, setLoading ] = useState<boolean>(false)
  const [activeRoom, setActiveRoom] = useState<RoomPropsInterface>({
    username: 'Zeshan Shakil',
    status: true,
  })
  
  useEffect(() => {
    setLoading(true)
    const fetchUsers = async () => {
      if (!state.token) return
      
      await getAllUsers(state.token).then((res) => {
      }).catch((err) => {
        errorToast(err)
      }).finally(() => {
        setLoading(false)
      })
    }
    
    fetchUsers()
  }, [])

  const handleLogout = async () => {
    await removeItemFromLocalStorage('user');
    window.location.reload();
  };
  const handleSetActiveRoom = async (item: RoomPropsInterface) => {
    setActiveRoom({username: item.username,status: item.status});
  };

  const handleSendMessage = async (item: string) => {};

  return (
    <Box className={classes.root}>
      {loading ? <Loader isLoading={true} /> : (
        <Box className={classes.row}>
        <Box className={`${classes.col4} shadow`} position={'relative'}>
          <ChatList onClick={handleSetActiveRoom} status={true} name='Zeshan Shakil' lastMessage='mera last msg 1' />
          <ChatList onClick={handleSetActiveRoom} status={false} name='Shani Shakil' lastMessage='mera last msg 2' />
          <ChatList onClick={handleSetActiveRoom} status={false} name='Daniyal Shakil' lastMessage='mera last msg 3' />
          <ChatList onClick={handleSetActiveRoom} status={true} name='Shaheer Shakil' lastMessage='mera last msg 4' />
          <ChatList onClick={handleSetActiveRoom} status={false} name='Areeba Shakil' lastMessage='mera last msg 5' />
        </Box>
      <Box className={`${classes.col6} shadow`}>
        <ChatBox room={activeRoom} receivedMessage={['Hi Baby How are you']} sendMessage={handleSendMessage} myMessages={['Hi Baby Im Fine']}  />
          <Button onClick={handleLogout} className={classes.logoutButton}>
            <Typography color={'white'}>Logout</Typography>
          </Button>
        </Box>
      </Box>
    )}
    </Box>
  );
};

export default ChatPage;
