import { Face, Send } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, ListItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Avatar from '../Avatar';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { getRoomMessages as getRoomMessagesApi, sendMessage } from '../../helpers/message.helper'
import { useUserContext } from '../../context/user.context';
import { ChatBoxPropsInterface, MessageApiResponse, MessagesState } from '../types';

const useStyles = makeStyles({
  name: {
    borderBottom: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 100px',
  },
  dialog: {
    padding: 20,
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

const ChatBox = ({ room }: ChatBoxPropsInterface) => {
  const { state } = useUserContext();
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<MessagesState>();

  useEffect(() => { 
    getRoomMessages()
  }, [ room ])

  const getRoomMessages = async () => {
    if (!state.token) return;
    const response = await getRoomMessagesApi(room.ID, state.token)
    if (response.success) {
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      const { myMessages, receiverMessages } = messageSeparator(response.data)
      setMessages((pre) => ({ ...pre, myMessages, receiverMessages }))
   }
  }
  
  const handleSendMessage = async () => {
    if (!state.token) return;

    const body = { text: inputValue, roomID: room.ID }
    const response = await sendMessage(body, state.token)
    if (response.success) {
      const { myMessages, receiverMessages } = messageSeparator(response.data)
      setMessages((pre) => ({ ...pre, myMessages, receiverMessages }))
    }
  }

  const handleOnChange = (item: string) => {
    setInputValue(item)
  }

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const messageSeparator = (item: MessageApiResponse | MessageApiResponse[]): MessagesState => {
    const myMessages: string[] = [];
    const receiverMessages: string[] = []

    if (Array.isArray(item)) { 
      item.forEach((val: MessageApiResponse) => {
        if (val.userID === room.userId) myMessages.push(val.text) 
        else if (val.userID === room.linkedUserId) receiverMessages.push(val.text) 
      })
    } else {
      if (item.userID === room.userId) myMessages.push(item.text) 
      else if (item.userID === room.linkedUserId) receiverMessages.push(item.text) 
    }
    return { myMessages, receiverMessages }
  }

  return (
    <React.Fragment>
      <Box className={classes.name}>
        <Avatar name={room.name} />
        <Box>
            <Typography variant="body1">{room.name}</Typography>
          {room.status ? <Typography variant="body2" color="textSecondary">
          Online
          </Typography> : null}
        </Box>
          </Box>
          <Box className={classes.chat}>
            {messages?.receiverMessages.map((msg: string, index: number) => {
              return (
                <Box key={index} className={`${classes.other} ${classes.dialog}`}>
                  <Typography sx={{ marginLeft: 1 }} variant="body1">
                    {msg}
                  </Typography>
                </Box>
              );
            })}
        {messages?.myMessages.map((msg: string, index: number) => {
          return (
            <Box key={index} className={`${classes.self} ${classes.dialog} ${classes.selfDialog}`}>
              <Typography variant="body1">{msg}</Typography>
            </Box>
          )})}
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
                {showEmojiPicker &&
                  <ListItem onBlur={handleToggleEmojiPicker} sx={{ position: 'absolute', bottom: 50, left: -10 }}>
                    <Picker data={data} />
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