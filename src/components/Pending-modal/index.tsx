import { Box, Card, Container, Grid, IconButton, Modal, Typography, styled } from '@mui/material';
import { CSSProperties, makeStyles } from '@mui/styles';
import Avatar from '../Avatar';
import { RequestedRoomsInterface, RequestsInterface } from '../../pages/types';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

export interface PendingRequestModalInterface {
  rooms: RequestsInterface[];
  handleOnClick?: (args: number) => void;
  title: string
}

export interface RequestsModalContainerInterface {
  rooms: RequestedRoomsInterface;
  visible: boolean;
  handleClose: () => void;
  handleOnClick?: (args: number) => void;
}

const StyledCard = styled(Card)(() => ({
  width: 300,
  height: 300,
  paddingBottom: 20,
  backgroundColor: '#111111b5',
  borderRadius: 2,
  position: 'relative',
  outline: 'none',
  overflowY: 'scroll',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  scrollbarColor: '#77777700'
}));

const StyledTitle = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 600,
  textTransform: 'uppercase',
  textAlign: 'center',
  position: 'sticky',
  top: 0,
  paddingBlock: 20,
  width: '100%',
  color: '#979797db',
  background: '#000',
  zIndex: 1,
}));

const ModalsContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '60%',
}));

const useStyles = makeStyles({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    paddingInline: 15,
    paddingTop: 5,
  },
  buttonHover: {
    '&:hover': {
      transform: 'rotate(180deg)',
      transition: 'transform .5s ease-in-out',
    },
  }
});

const ModalView = ({ rooms, title, handleOnClick }: PendingRequestModalInterface) => {
  const classes = useStyles();

  return (
      <StyledCard>
        <StyledTitle>{title}</StyledTitle>
      {rooms.length ?
        rooms.length && rooms.map((room) => (
          <Box className={classes.box} key={room.ID}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar name={room.userName} />
              <Typography variant="body1" style={{ color: '#fff', marginBottom: 0 }}>
                {room.userName}
              </Typography>
            </Box>
            {handleOnClick ? (
              <IconButton className={classes.buttonHover} color="primary" onClick={() => handleOnClick(room.ID)}>
                <AddIcon />
              </IconButton>
            ) : null}
          </Box>
        )) : <Typography color='#9f9f9f63' align='center' marginTop='30px' fontSize='120px' fontWeight={500} textTransform='uppercase'>?</Typography>}
      </StyledCard>
  );
};

const RequestsModalContainer = ({ handleClose, handleOnClick, rooms, visible }: RequestsModalContainerInterface) => {

  return (
    <Modal sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} open={visible} onClose={handleClose}>
      <ModalsContainer>
        <ModalView title="Sent Requests" rooms={rooms.SentRequests} />
        <ModalView title="Pending Requests" handleOnClick={handleOnClick} rooms={rooms.ReceiveRequests} />
      </ModalsContainer>
    </Modal>
  );
};

export default RequestsModalContainer;
