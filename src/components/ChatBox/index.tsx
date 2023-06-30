import { Face, MoreVert, Send } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Menu, MenuItem, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Avatar from '../Avatar';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import moment from 'moment';
import { deleteMessageApi, getRoomMessages as getRoomMessagesApi, sendMessage } from '../../helpers/message.helper';
import { useUserContext } from '../../context/user.context';
import { MessageStateInterface, SendMessageToSocketInterface } from '../types';
import useSocket from '../../hooks/use-socket';

interface BoxPropsInterface {
  userName: string;
  userID: number;
  ID: number;
  status: boolean;
  secondRoomID: number;
  linkedUserID: number;
  socket: any;
  sendMessageToSocket: (args: SendMessageToSocketInterface) => void;
}

const useStyles = makeStyles({
  name: {
    borderBottom: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0px',
  },
  dialog: {
    padding: 20,
    marginRight: '10px',
    maxWidth: '250px',
    borderRadius: 3,
    position: 'relative',
    color: 'black',
  },
  other: {
    background: '#ccc',
    marginBottom: '20px',
    width: '40%',
  },
  self: {
    marginBottom: '20px',
    width: '40%',
    background: '#9eea9e',
    marginLeft: 'auto',
  },
  chat: {
    height: 'calc(100% - 240px)',
    overflowY: 'scroll',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  msg: {
    height: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  msgInput: {
    backgroundColor: '#f6f6f6',
    border: 'none',
    fontSize: '0.2rem',
  },
  inputIcon: {
    color: '#777',
  },
  time: {
    fontSize: '0.8rem',
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
  messageOptionsIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

const ChatBox = ({ ID, userID, userName, status, secondRoomID, linkedUserID }: BoxPropsInterface) => {
  const { sendMessageToSocket, socket, sendDeleteMessageToSocket } = useSocket(userID)
  const classes = useStyles();
  const { state } = useUserContext();
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<MessageStateInterface[]>([]);
  const [sendSocketMessage, setSendSocketMessage] = useState<SendMessageToSocketInterface | null>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<MessageStateInterface | null>(null);

  useEffect(() => {
    getRoomMessages();
  }, [ID]);

  useEffect(() => {
    if (!!sendSocketMessage) sendMessageToSocket(sendSocketMessage)
  }, [sendSocketMessage]);

  useEffect(() => {
    socket.on("receive-message", (/* message: SendMessageToSocketInterface */) => {
      getRoomMessages()
      setSendSocketMessage(null)
      });
  }, []);

  useEffect(() => {
    socket.on("after-message-deletion", (messageId: number) => {
        removeFromMessagesById(messageId);
      });
  }, []);
  
  const getRoomMessages = async () => {
    if (!state.token) return;
    const response = await getRoomMessagesApi(ID, secondRoomID, state.token);
    if (response.success) {
      const interleavedMessages = interleaveMessages(response.data.rows);
      setMessages(interleavedMessages);
    }
  };

  const deleteMessageFromDB = async (messageId: number) => {
    if (!state.token) return;
    await deleteMessageApi(messageId, state.token);
    removeFromMessagesById(messageId)
  };

  const handleSendMessage = async () => {
    if (!state.token || !inputValue) return;

    const body = { text: inputValue, roomID: ID, secondRoomID };
    const response = await sendMessage(body, state.token);
    if (response.success) {
      const interleavedMessages = interleaveMessages(response.data);
      handleSetSocketMessage();
      setMessages(prev => [...prev, ...interleavedMessages]);
      setInputValue('');
    }
  };

  const handleSetSocketMessage = () => {
    const message = {
      userID,
      text: inputValue,
      roomID: ID,
      linkedUserID
    };
    setSendSocketMessage(message);
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  const handleOpenMessageOptions = (message: MessageStateInterface, event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessage(message);
  };

  const handleCloseMessageOptions = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleDeleteMessage = async (message: MessageStateInterface) => {
    console.log('Deleting message:', message);
    await deleteMessageFromDB(message.ID)

    sendDeleteMessageToSocket({messageId: message.ID, linkedUserID})
    handleCloseMessageOptions();
  };

  const interleaveMessages = (data: MessageStateInterface | MessageStateInterface[]) => {
    const messagesArray = Array.isArray(data) ? data : [data];

    return messagesArray.map(message => {
      const formattedTime = moment(message.createdAt).format('h:mm A');
      return {
        ...message,
        createdAt: formattedTime,
      };
    });
  };


  const removeFromMessagesById = (messageId: number)  =>{
    setMessages((pre: MessageStateInterface[]) => {
      let filteredMessages = pre.filter((msg: MessageStateInterface) => {
        if (msg.ID !== messageId) return msg
      })
      return filteredMessages
    })
  }

  const getUniquesValuesByID = (arr: MessageStateInterface[]) => {
    const uniqueIDs = new Set();
    const result = [];
    for (const obj of arr) {
      const id = obj.ID;
      if (!uniqueIDs.has(id)) {
        uniqueIDs.add(id);
        result.push(obj);
      }
    }
    return result;
  }
  

  return (
    <React.Fragment>
      <Box className={classes.name}>
        <Avatar name={userName} />
        <Box>
          <Typography variant="body1">{userName}</Typography>
          {status && (
            <Typography variant="body2" color="textSecondary">
              Online
            </Typography>
          )}
        </Box>
      </Box>
      <Box className={classes.chat} ref={chatBoxRef}>
        {getUniquesValuesByID(messages).map(message => (
          <Box
            key={message.ID}
            className={`${classes.dialog} ${message.userID === userID ? classes.self : classes.other}`}
          >
            <Typography variant="body1">{message.text}</Typography>
            <Typography className={classes.time}>{message.createdAt}</Typography>
            {message.userID === userID && (
              <IconButton
                className={classes.messageOptionsIcon}
                onClick={event => handleOpenMessageOptions(message, event)}
              >
                <MoreVert />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
      <form className={classes.msg}>
        <TextField
          placeholder="Type a message..."
          variant="outlined"
          onChange={handleOnChange}
          className={classes.msgInput}
          value={inputValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleToggleEmojiPicker} className={classes.inputIcon}>
                  <Face />
                </IconButton>
                {showEmojiPicker && (
                  <Box sx={{ position: 'absolute', bottom: 50, left: -10 }}>
                    <Picker data={data} />
                  </Box>
                )}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disabled={inputValue === ''} onClick={handleSendMessage} className={classes.inputIcon}>
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMessageOptions}
        onClick={handleCloseMessageOptions}
      >
        {selectedMessage && <MenuItem onClick={() => handleDeleteMessage(selectedMessage)}>Delete</MenuItem>}
      </Menu>
    </React.Fragment>
  );
};

export default ChatBox;
