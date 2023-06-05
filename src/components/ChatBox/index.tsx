import { Send } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChatBoxInterface } from '../types';

const useStyles = makeStyles({
  col6: {
    background: '#f6f6f6',
    width: '70%',
    padding: '24px',
    overflowY: 'auto'
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

const ChatBox = ({receivedMessage, myMessages, sendMessage}: ChatBoxInterface) => {
  const classes = useStyles();

  const handleSendMessage = () => {
    sendMessage('sendMessage',)
  }

  return (
    <Box className={`${classes.col6} shadow`}>
          <Box className={classes.name}>
            <Typography variant="body1">Maine Coon</Typography>
            <Typography variant="body2" color="textSecondary">
              Online
            </Typography>
          </Box>
          <Box className={classes.chat}>
            {receivedMessage.map((msg: any) => {
              return (
                <Box key={Math.random()} className={`${classes.other} ${classes.dialog}`}>
                  <Typography sx={{ marginLeft: 1 }} variant="body1">
                    {msg}
                  </Typography>
                </Box>
              );
            })}
        {myMessages.map((msg: any) => {
        return  <Box className={`${classes.self} ${classes.dialog} ${classes.selfDialog}`}>
                  <Typography variant="body1">{msg}</Typography>
                </Box>
            })}
          </Box>
          <form className={classes.msg}>
            <TextField
              placeholder="Type a message..."
              variant="outlined"
              className={classes.msgInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSendMessage} className={classes.inputIcon}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
        </Box>
  )
}

export default ChatBox