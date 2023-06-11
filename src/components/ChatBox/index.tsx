import { Face, Send } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, ListItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChatBoxPropsInterface } from '../types';
import React, { ChangeEvent, useState } from 'react';
import Avatar from '../Avatar';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'


const useStyles = makeStyles({
  name: {
    borderBottom: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 5px',
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
    height: 'calc(100% - 240px)', 
    overflowY: 'scroll',
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

const ChatBox = ({receivedMessage, myMessages, sendMessage, room}: ChatBoxPropsInterface) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const handleSendMessage = () => {
    sendMessage('sendMessage',)
  }
  const handleOnChange = (item: string) => {
    console.log(item);
    
    setInputValue(item)
  }

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <React.Fragment>
      <Box className={classes.name}>
        <Avatar name={room.username} />
        <Box>
            <Typography variant="body1">{room.username}</Typography>
          {room.status ? <Typography variant="body2" color="textSecondary">
          Online
          </Typography> : null}
        </Box>
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e.target.value)}
          className={classes.msgInput}
          value={inputValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleToggleEmojiPicker} className={classes.inputIcon}>
                  <Face />
                </IconButton>
                {showEmojiPicker && <ListItem onBlur={handleToggleEmojiPicker} sx={{position: 'absolute', bottom: 50, left: -10}}>
                <Picker data={data} onSelect={console.log} />
                </ListItem>}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSendMessage} className={classes.inputIcon}>
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
          </form>
              </React.Fragment>
  )
}

export default ChatBox