import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { removeItemFromLocalStorage } from '../../utils';
import ChatBox from '../../components/ChatBox/index';
import { useUserContext } from '../../context/user.context';
import { acceptRoomRequest, createRoom, getRoomById,getSentRequests, getRoomsRequests, getUserRooms } from '../../helpers/room.helper';
import { errorToast } from '../../utils/toast';
import ChatList from '../../components/ChatList';
import UserList from '../../components/UserList';
import Loader from '../../components/Loader';
import { getAllUsers } from '../../helpers/user.helper';
import Welcome from '../../components/welcome';
import { ClosedCaption, Face, PendingActions, Slideshow } from '@mui/icons-material';
import { GetRoomApiRes } from '../../helpers/api-response';
import { SOCKET_URL } from '../../common';
import { ActiveRoomInterface, MyRoomsStateInterface, RequestedRoomsInterface } from '../types';
import UserDetailsModal from '../../components/user-Modal';
import RequestsModalContainer from '../../components/Pending-modal';
import useSocket from '../../hooks/use-socket';

const RootContainer = styled(Box)({
  width: '100vw',
  maxHeight: '100vh',
});

const RowContainer = styled(Box)({
  justifyContent: 'center',
  width: '100%',
  display: 'flex',
  height: '100vh',
});

const LeftColumn = styled(Box)({
  background: '#141f52',
  overflowY: 'scroll',
  width: 300,
  padding: '20px 0px',
  zIndex: 10,
});
const RightColumn = styled(Box)({
  background: '#08041c',
  overflowY: 'scroll',
  width: 280,
  padding: '20px 0px',
  zIndex: 10,
});

const RoomCard = styled(Box)({
  marginBottom: 8,
  overflowY: 'scroll',
  position: 'relative',
});

const CenterView = styled(Box)({
  background: '#f6f6f6',
  padding: '0 24px',
  height: '100vh',
});

const LogoutButton = styled(Button)({
  background: 'black',
  padding: '20px 0',
  width: '90%',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const HideShowButton = styled(Button)({
  background: '#a7181800',
  padding: '8px',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  position: 'absolute',
  top: 10,
  zIndex: 10
});

const CurrentUser = styled(Button)({
  background: '#3e3e3ea3',
  padding: 20,
  position: 'absolute',
  bottom: 0,
  zIndex: 10
});

const PendingRequests = styled(Button)({
  background: '#3e3e3ea3',
  width: '18%',
  padding: 20,
  position: 'absolute',
  bottom: 0,
  zIndex: 10,
  right: 0
});

const useStyles = makeStyles({
  hideSlideShowIcon: {
    // display: 'none',
    // '&:hover': {
    //   display: 'block'
    // },
  }
});

const ChatPage = () => {
  const classes = useStyles();
  const { state } = useUserContext();
  const { activeUsers, sendMessageToSocket, socket } = useSocket(state.userID)
  const [loading, setLoading] = useState<boolean>(false);
  const [isUserDetailsModalVisible, setIsUserDetailsModalVisible] = useState<boolean>(false);
  const [isPendingRequestModalVisible, setIsPendingRequestModalVisible] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [myRooms, setMyRooms] = useState<MyRoomsStateInterface[]>([]);
  const [roomsRequests, setRoomsRequests] = useState<RequestedRoomsInterface>({ ReceiveRequests: [], SentRequests: [] });
  const [activeRoom, setActiveRoom] = useState<ActiveRoomInterface | null>(null);
  const [isChatListVisible, setChatListVisible] = useState<boolean>(true);
  const [isUserListVisible, setUserListVisible] = useState<boolean>(true);
  const [hasInitialize, setHasInitialize] = useState<boolean>(false);


  const handleCreateNewRoom = async (linkedUserID: number) => {
    if (!state.token) return;
    const body = { linkedUserID };
    const response = await createRoom(body, state.token);
    if (response?.success) fetchInitialData()
    else errorToast(response)
  };

  const handleAcceptRoomRequest = async (roomId: number) => {
    if (state.token) {
      const response = await acceptRoomRequest(roomId, state.token);
      fetchInitialData()
      if (!response?.success) errorToast(response)
    }
  };

  const handleGetRoomsRequests = async () => {
    if (!state.token) return;

    const response = await getRoomsRequests(state.token);
    if (response?.success) {
      const data = response.data?.map((value: any) => {
        return {
          ID: value.ID,
          userName: value.user.name,
          userId: value.user.ID,
        }
      })
      setRoomsRequests((pre: RequestedRoomsInterface) => ({ ...pre, ReceiveRequests: data }))
  } else errorToast(response)
  };

  const handleGetSentRequests = async () => {
      if (!state.token) return;

    const response = await getSentRequests(state.token);
    if (response?.success) {
      const data = response.data?.map((value: any) => {
        return {
          ID: value.ID,
          userName: value.linkedUser.name,
          userId: value.linkedUser.ID,
        }
      })
      setRoomsRequests((pre: RequestedRoomsInterface) => ({ ...pre, SentRequests: data }))
    } else errorToast(response)
  };

  const handleGetAllUsers = async () => {
    if (!state.token) return;
    const response = await getAllUsers(state.token);
    if (response.success) setAllUsers(response.data);
    else errorToast(response)
  };

  const handleGetMyRooms = async () => {
    if (!state.token) return;

    const response = await getUserRooms(state.token);
    if (response?.success) {
      const myRoomsData = response.data.map((item: GetRoomApiRes) => {
        return {
          ID: item.ID,
          linkedUserID: item.linkedUser?.ID,
          userName: item.linkedUser?.name,
          status: item.status
        }
      });
      setMyRooms(myRoomsData);
    } else errorToast(response)
  };

  const handleGetRoomById = async (roomId: number) => {
    if (!state.token) return;
    const response = await getRoomById(roomId, state.token) 
    if (response?.success) {
      let room = response.data as GetRoomApiRes
      const config = {
        ID: room.ID,
        userName: room.linkedUser.name,
        linkedUserID: room.linkedUser.ID,
        status: room.status,
        secondRoomID: room.secondRoomID
      }
      setActiveRoom(config)
    } else errorToast(response)
  };

  const fetchInitialData = async () => {
    setLoading(true);
    handleGetMyRooms()
    handleGetAllUsers()
    handleGetRoomsRequests()
    handleGetSentRequests()
    setLoading(false);
  };

  useEffect(() => {
    if (!hasInitialize) {
      fetchInitialData()
      setHasInitialize(true)
    }
  }, [hasInitialize]);

  const handleLogout = async () => {
    await removeItemFromLocalStorage('user');
    window.location.reload();
  };

  const handleSetActiveRoom = async (roomId: number) => {
      handleGetRoomById(roomId);
  };

  const handleOnUserClick = async (userID: number) => {
    await handleCreateNewRoom(userID)
  };

  // const handleCheckUserActiveOrNot = (id: number) => {
  //   return !!activeUsers.find((e) => e.userID === id)
  // };

  const toggleChatListVisibility = () => {
    setChatListVisible(prevState => !prevState);
  };

  const toggleUserListVisibility = () => {
    setUserListVisible(prevState => !prevState);
  };

  return (
    <RootContainer>
      {loading ? (
        <Loader isLoading={true} />
      ) : (
          <>
        <RowContainer>
            {isChatListVisible && (
              <LeftColumn className="shadow" position="relative">
                  <Box>
                      {myRooms.map(room => {
                        return (
                          <RoomCard key={room.ID}>
                          <ChatList lastMessage={room.lastMessage} handleOnClick={handleSetActiveRoom} ID={room.ID} userName={room.userName} status={!!activeUsers.some((active) => active.userID === room.linkedUserID)} userID={room.linkedUserID} />
                        </RoomCard>
                      );
                    })}
                  </Box>
              </LeftColumn>
            )}
            <HideShowButton  onClick={toggleChatListVisibility} sx={{left: isChatListVisible? 220 : 30}}>
              {!isChatListVisible ? <Slideshow className={!isChatListVisible ? classes.hideSlideShowIcon : '' } fontSize='large' /> : <ClosedCaption fontSize='large' />}
            </HideShowButton>

            <CenterView className={`shadow`} sx={{ width: (isChatListVisible && isUserListVisible) ? '60%' : (isChatListVisible || isUserListVisible) ? '80%' : '100%' }}>
              {(activeRoom && !!activeRoom.secondRoomID) ? <ChatBox socket={socket} sendMessageToSocket={sendMessageToSocket} ID={activeRoom.ID} secondRoomID={activeRoom.secondRoomID} status={!!activeUsers.some((active) => active.userID === activeRoom.linkedUserID)} userName={activeRoom.userName} linkedUserID={activeRoom.linkedUserID} userID={state.userID} /> : <Welcome />}
              <LogoutButton onClick={handleLogout}>
                <Typography color="white">Logout</Typography>
              </LogoutButton>
            </CenterView>

            <HideShowButton  onClick={toggleUserListVisibility} sx={{right: isUserListVisible? 310 : 30}}>
              {!isUserListVisible ? <Slideshow fontSize='large' /> : <ClosedCaption fontSize='large' />}
            </HideShowButton>
            {isUserListVisible && (
              <RightColumn className="shadow" position="relative">
                  {allUsers.map(user => {
                    return (
                      <RoomCard key={user.ID}>
                          <UserList
                            ID={user.ID}
                            userName={user.name}
                            handleOnClick={handleOnUserClick}
                            /> 
                        </RoomCard>
                      );
                    })}
              </RightColumn>
            )}
        </RowContainer>
      <CurrentUser style={isChatListVisible ? {width: 295} : {width: 50}} onMouseEnter={() => setIsUserDetailsModalVisible(true)}>
          <Face />
      </CurrentUser>
      <PendingRequests style={isUserListVisible ? {width: 275} : {width: 50}} onMouseEnter={() => setIsPendingRequestModalVisible(true)}>
          <PendingActions />
      </PendingRequests>
      {state.username && <UserDetailsModal user={{ email: state.username, name: state.username }} visible={isUserDetailsModalVisible} handleClose={() => setIsUserDetailsModalVisible(false)} />}
      <RequestsModalContainer handleOnClick={handleAcceptRoomRequest} rooms={roomsRequests} visible={isPendingRequestModalVisible} handleClose={() => setIsPendingRequestModalVisible(false)} />
      </>
      )}
    </RootContainer>
  );
};

export default ChatPage;
