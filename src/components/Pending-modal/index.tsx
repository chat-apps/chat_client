import { Box, Card, Grid, IconButton, Modal, Typography, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Avatar from '../Avatar';
import { RequestedRoomsInterface, RequestsInterface } from '../../pages/types';
import AddIcon from '@mui/icons-material/Add';

export interface PendingRequestModalInterface {
  rooms: RequestsInterface[];
  visible: boolean;
  handleClose: () => void;
  handleOnClick?: (args: number) => void;
}

export interface RequestsModalContainerInterface {
  rooms: RequestedRoomsInterface;
  visible: boolean;
  handleClose: () => void;
  handleOnClick?: (args: number) => void;
}

const StyledCard = styled(Card)(() => ({
  maxWidth: 300,
  height: 300,
  paddingBottom: 20,
  margin: 'auto',
  marginTop: '25vh',
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
  },
  modal: {
    width: 'calc(50% - 10px)', // Adjust the width as per your requirement
    margin: '10px',
  },
  flexContainer: {
    display: 'flex',
  },
});

const ModalView = ({ handleClose, visible, rooms, handleOnClick }: PendingRequestModalInterface) => {
  const classes = useStyles();

  console.log(rooms, "lllll");
  

  return (
    <Modal open={visible} onClose={handleClose}>
      <StyledCard>
        <StyledTitle>Pending Requests</StyledTitle>
        {rooms.length && rooms.map((room) => (
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
        ))}
      </StyledCard>
    </Modal>
  );
};

const RequestsModalContainer = ({ handleClose, handleOnClick, rooms, visible }: RequestsModalContainerInterface) => {
  const classes = useStyles();

  return (
    <div className={classes.flexContainer}>
      <ModalView visible={visible} handleClose={handleClose} rooms={rooms.SentRequests} />
      <ModalView visible={visible} handleClose={handleClose} handleOnClick={handleOnClick} rooms={rooms.ReceiveRequests} />
    </div>
  );
};

export default RequestsModalContainer;
