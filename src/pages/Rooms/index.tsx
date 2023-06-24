import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { removeItemFromLocalStorage } from '../../utils';
import ChatBox from '../../components/ChatBox/index';
import { useUserContext } from '../../context/user.context';
import { createRoom, getRoomById, getRoomByLinkedUserId, getUserRooms } from '../../helpers/room.helper';
import useSocket from '../../hooks/use-socket';
import { errorToast } from '../../utils/toast';
import ChatList from '../../components/ChatList';
import Loader from '../../components/Loader';
import { MyRoomsStateInterface, RoomPropsInterface } from '../../components/types';
import { getAllUsers } from '../../helpers/login.helper';
import Welcome from '../../components/welcome';
import { ClosedCaption, Slideshow } from '@mui/icons-material';
import { GetRoomApiRes } from '../../helpers/api-response';
import { SOCKET_URL } from '../../common';
import { OnlineUsersResponse } from '../../hooks/types';

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
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  width: 280,
  padding: '20px 0px',
  zIndex: 10,
});

const RoomCard = styled(Box)({
  marginBottom: 8,
  overflowY: 'scroll',
  position: 'relative',
});

const RightColumn = styled(Box)({
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
});

const ChatPage = () => {
  const { state } = useUserContext();
  const { activeUsers, disconnect } = useSocket(SOCKET_URL, state.userID)
  const [loading, setLoading] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  const [myRooms, setMyRooms] = useState<MyRoomsStateInterface[]>([]);
  const [activeRoom, setActiveRoom] = useState<RoomPropsInterface | null>(null);
  const [isChatListVisible, setChatListVisible] = useState<boolean>(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      handleGetMyRooms()
      handleGetAllUsers()
      setLoading(false);
    };

    if (!allUsers.length && !myRooms.length) {
      fetchInitialData();
    }

    return 
  }, [state.token, allUsers.length, myRooms.length, state.userID]);

  const handleCreateNewRoom = async (id: number) => {
    if (!state.token) return;

    const body = { linkedUser: id };

    const response = await createRoom(body, state.token);
    if (response.success) {
      handleGetMyRooms()
      return response.data
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
    if (response.success) {
      const myRoomsData = response.data.map((item: GetRoomApiRes) => {
        return {
          ID: item.ID,
          linkedUserId: item.linkedUser.ID,
          lastMessage: item.messages[0]?.text,
        }
      });
      setMyRooms(myRoomsData);
    } else errorToast(response)
  };

  const handleGetRoomById = async (id: number) => {
    if (!state.token) return;
    const response = await getRoomById(state.token, id) 
    if (response.success) {
      let room = response.data as GetRoomApiRes
      const config = {
        ID: room.ID,
        name: room.linkedUser.name,
        linkedUserId: room.linkedUserId,
        userId: room.userID,
        status: handleCheckUserActiveOrNot(room.linkedUserId),
      }
      setActiveRoom(config)
    } else errorToast(response)
  };

  const handleGetRoomByLinkedUserId = async (id: number): Promise<GetRoomApiRes | undefined> => {
    if (!state.token) return;
    const response = await getRoomByLinkedUserId(state.token, id) 
    if (response.success) {
      return response.data
    } else errorToast(response)
   };

  const handleLogout = async () => {
    // disconnect(state.userID)
    await removeItemFromLocalStorage('user');
    window.location.reload();
  };

  const handleSetActiveRoom = async (linkeduserId: number, roomId: number | undefined) => {
    if (roomId && myRooms.some(item => item.ID === roomId)) {
      handleGetRoomById(roomId);
    } else {
      let room = await handleGetRoomByLinkedUserId(linkeduserId)
      if (room) {
        const config = {
          ID: room.ID,
          name: room.linkedUser.name,
          linkedUserId: room.linkedUserId,
          userId: room.userID,
          status: handleCheckUserActiveOrNot(room.linkedUserId),
        }
      setActiveRoom(config)
      } else { 
        let data = await handleCreateNewRoom(linkeduserId)
        handleGetRoomById(data.ID);
      }
    }
  };

  const handleCheckUserActiveOrNot = (id: number) => {
    return onlineUsers.includes(id)
  };

  const toggleChatListVisibility = () => {
    setChatListVisible(prevState => !prevState);
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
                  {allUsers.map(user => {
                  const room = {
                    userName: user.name,
                    userId: user.ID,
                    ID: myRooms.find(({ linkedUserId }) => linkedUserId === user.ID)?.ID,
                    lastMessage: myRooms.find(({ linkedUserId }) => linkedUserId === user.ID)?.lastMessage,
                  };
                  return (
                    <RoomCard key={user.ID}>
                      <ChatList
                        status={!!activeUsers.find((active: OnlineUsersResponse) => active.userId === user.ID)}
                        handleOnClick={handleSetActiveRoom}
                        room={room}
                      />
                    </RoomCard>
                  );
                })}
              </Box>
          </LeftColumn>
            )}
            <HideShowButton  onClick={toggleChatListVisibility} sx={{left: isChatListVisible? 310 : 30}}>
              {!isChatListVisible ? <Slideshow fontSize='large' /> : <ClosedCaption fontSize='large' />}
            </HideShowButton>
          <RightColumn className={`shadow`} sx={{width: '100%'}}>
            {activeRoom ? <ChatBox room={activeRoom} /> : <Welcome />}
            <LogoutButton onClick={handleLogout}>
              <Typography color="white">Logout</Typography>
            </LogoutButton>
          </RightColumn>
        </RowContainer>
      )}
    </RootContainer>
  );
};

export default ChatPage;
