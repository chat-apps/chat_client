import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { removeItemFromLocalStorage } from '../../utils';
import ChatBox from '../../components/ChatBox/index';
import { useUserContext } from '../../context/user.context';
import { acceptRoomRequest, createRoom, getRoomById,getSentRequests, getRoomsRequests, getUserRooms } from '../../helpers/room.helper';
import useSocket from '../../hooks/use-socket';
import { errorToast } from '../../utils/toast';
import ChatList from '../../components/ChatList';
import UserList from '../../components/UserList';
import Loader from '../../components/Loader';
import { getAllUsers } from '../../helpers/login.helper';
import Welcome from '../../components/welcome';
import { ClosedCaption, Face, PendingActions, Slideshow } from '@mui/icons-material';
import { GetRoomApiRes } from '../../helpers/api-response';
import { SOCKET_URL } from '../../common';
import { MyRoomsStateInterface, RequestedRoomsInterface } from '../types';
import UserDetailsModal from '../../components/user-Modal';
import RequestsModalContainer from '../../components/Pending-modal';

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
  width: '100%',
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
  width: '19%',
  padding: 20,
  position: 'absolute',
  bottom: 10,
  zIndex: 10
});

const PendingRequests = styled(Button)({
  background: '#3e3e3ea3',
  width: '18%',
  padding: 20,
  position: 'absolute',
  bottom: 10,
  zIndex: 10,
  right: 0
});

const ChatPage = () => {
  const { state } = useUserContext();
  const { activeUsers } = useSocket(SOCKET_URL, state.userID)
  const [loading, setLoading] = useState<boolean>(false);
  const [isUserDetailsModalVisible, setIsUserDetailsModalVisible] = useState<boolean>(false);
  const [isPendingRequestModalVisible, setIsPendingRequestModalVisible] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [myRooms, setMyRooms] = useState<MyRoomsStateInterface[]>([]);
  const [roomsRequests, setRoomsRequests] = useState<RequestedRoomsInterface>({
    ReceiveRequests: [],
    SentRequests: []
  });
  const [activeRoom, setActiveRoom] = useState<MyRoomsStateInterface | null>(null);
  const [isChatListVisible, setChatListVisible] = useState<boolean>(true);
  const [isUserListVisible, setUserListVisible] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      handleGetMyRooms()
      handleGetAllUsers()
      handleGetRoomsRequests()
      handleGetSentRequests()
      setLoading(false);
    };

    if (!allUsers.length && !myRooms.length) {
      fetchInitialData();
    }
  }, [state.token, allUsers.length, myRooms.length, state.userID]);

  const handleCreateNewRoom = async (linkedUserId: number) => {
    if (!state.token) return;

    const body = { linkedUser: linkedUserId };
    const response = await createRoom(body, state.token);
    if (response?.success) {
      handleGetMyRooms();
      return response.data
    } else errorToast(response)
  };
  
  const handleAcceptRoomRequest = async (roomId: number) => {
    if (state.token) {
    const response = await acceptRoomRequest(roomId, state.token);
      if (response?.success) {
        handleGetMyRooms();
        handleSetActiveRoom(roomId);
        return response.data
      } else errorToast(response)
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
    const usersRes = await getAllUsers(state.token);
      if (usersRes.success) setAllUsers(usersRes.data);
  };

  const handleGetMyRooms = async () => {
    if (!state.token) return;

    const response = await getUserRooms(state.token);
    if (response?.success) {
      const myRoomsData = response.data.map((item: GetRoomApiRes) => {
        return {
          ID: item.ID,
          linkedUserId: item.linkedUser?.ID,
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
      console.log(room);
      
      const config = {
        ID: room.ID,
        userName: room.linkedUser.name,
        linkedUserId: room.linkedUser.ID,
        activeStatus: handleCheckUserActiveOrNot(room.linkedUser.ID),
        status: room.status
      }
      setActiveRoom(config)
    } else errorToast(response)
  };

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

  const handleCheckUserActiveOrNot = (id: number) => {
    return !!activeUsers.find((e) => e.userId === id)
  };

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
        <RowContainer>
            {isChatListVisible && (
              <LeftColumn className="shadow" position="relative">
                  <Box>
                      {myRooms.map(room => {
                      return (
                        <RoomCard key={room.ID}>
                          <ChatList lastMessage={room.lastMessage} handleOnClick={handleSetActiveRoom} ID={room.ID} userName={room.userName} status={activeUsers.some((active) => active.userId === room.linkedUserId)} userID={room.linkedUserId} />
                        </RoomCard>
                      );
                    })}
                  </Box>
              </LeftColumn>
            )}
            <HideShowButton  onClick={toggleChatListVisibility} sx={{left: isChatListVisible? 220 : 30}}>
              {!isChatListVisible ? <Slideshow fontSize='large' /> : <ClosedCaption fontSize='large' />}
            </HideShowButton>

            <CenterView className={`shadow`} sx={{ width: (isChatListVisible && isUserListVisible) ? '60%' : (isChatListVisible || isUserListVisible) ? '80%' : '100%' }}>
              {activeRoom ? <ChatBox ID={activeRoom.ID} status={activeRoom.activeStatus} userName={activeRoom.userName} linkedUserID={activeRoom.linkedUserId} userID={state.userID} /> : <Welcome />}
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
                            disabled={!!myRooms.some(room => room.linkedUserId === user.ID) || roomsRequests.ReceiveRequests.some(room => room.userId === user.ID) || roomsRequests.SentRequests.some(room => room.userId === user.ID)}
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
      )}
      <CurrentUser onMouseEnter={() => setIsUserDetailsModalVisible(true)}>
          <Face />
      </CurrentUser>
      <PendingRequests onMouseEnter={() => setIsPendingRequestModalVisible(true)}>
          <PendingActions />
      </PendingRequests>
      {state.username && <UserDetailsModal user={{ email: state.username, name: state.username }} visible={isUserDetailsModalVisible} handleClose={() => setIsUserDetailsModalVisible(false)} />}
      <RequestsModalContainer handleOnClick={handleAcceptRoomRequest} rooms={roomsRequests} visible={isPendingRequestModalVisible} handleClose={() => setIsPendingRequestModalVisible(false)} />
    </RootContainer>
  );
};

export default ChatPage;
