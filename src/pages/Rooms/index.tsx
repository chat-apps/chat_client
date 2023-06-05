import { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Send } from '@mui/icons-material';
import { removeItemFromLocalStorage } from '../../utils';
import ChatBox from '../../components/ChatBox/index';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    background: 'antiquewhite'
  },
  row: {
    justifyContent: 'center',
    margin: 'auto',
    width: 1000,
    height: 600,
    display: 'flex'
  },
  col4: {
    background: '#333',
    width: '30%',
    padding: '24px'
  },
  col6: {
    background: '#f6f6f6',
    width: '70%',
    padding: '24px',
    overflowY: 'auto'
  },
  searchInput: {
    color: '#aaa',
    fontSize: '0.5rem'
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  avatar: {
    width: 50,
    borderRadius: '50%',
    marginRight: 10
  },
  notice: {
    background: 'green',
    borderRadius: '50%',
    padding: '2px 5px',
    color: '#fff',
    marginLeft: '8px'
  },
  name: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '8px',
    marginBottom: '16px'
  },
  dialog: {
    padding: '3%',
    marginRight: '10px',
    maxWidth: '250px',
    borderRadius: '0.5rem',
    position: 'relative',
    background: '#ccc',
    color: 'black'
  },
  other: {
    marginBottom: '20px',
    width: '40%'
  },
  self: {
    flexDirection: 'row-reverse',
    marginBottom: '20px',
    float: 'right',
    width: '40%'
  },
  selfDialog: {
    background: '#9eea9e',
    marginLeft: '15px'
  },
  chat: {
    height: '400px',
    overflowY: 'auto',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  chatTime: {
    alignSelf: 'flex-end',
    marginBottom: 0
  },
  read: {
    position: 'absolute',
    transform: 'translate(30px, 30px)'
  },
  msg: {
    height: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  msgInput: {
    backgroundColor: '#f6f6f6',
    border: 'none',
    fontSize: '0.2rem'
  },
  inputIcon: {
    color: '#777'
  }
});

const ChatPage = () => {
  const classes = useStyles();
  const [messageReceived, setMessageReceived] = useState<string[]>([]);

  const handleLogout = async () => {
    await removeItemFromLocalStorage('user');
    window.location.reload();
  };

  const handleSendMessage = async (item: string) => {

  };

  return (
    <Box className={classes.root}>
      <Box className={classes.row}>
        <Box className={`${classes.col4} shadow`} position={'relative'}>
          <Box className={classes.box}>
            <img src="https://picsum.photos/50/50/?random=1" className={classes.avatar} alt="avatar" />
            <Box>
              <Typography variant="body1" style={{ color: '#fff', marginBottom: 0 }}>
                Maine Coon
              </Typography>
              <Typography variant="body2" style={{ color: '#fff' }}>
                Lorem ipsum dolor sit ...
              </Typography>
            </Box>
          </Box>
          <Button onClick={handleLogout} sx={{ bgcolor: 'black', py: 2, position: 'absolute', bottom: 0, width: '100%', left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography color={'white'}>Logout</Typography>
          </Button>
        </Box>
        <ChatBox receivedMessage={undefined} sendMessage={handleSendMessage} myMessages={undefined}  />
      </Box>
    </Box>
  );
};

export default ChatPage;
