export interface ChatBoxPropsInterface {
  room: RoomPropsInterface;
}

export interface ChatListPropsInterface {
  status: boolean;
  room: CardRoomInterface;
  handleOnClick: (arg1: number, arg2?: number) => void;
}

interface CardRoomInterface {
  userName: string;
  userId: number;
  ID?: number;
  lastMessage?: string;
}

export interface AvatarPropsInterface {
  name: string;
}

export interface LoaderPropsInterface {
  isLoading: boolean;
}
export interface RoomPropsInterface {
  ID: number;
  name: string;
  status: boolean;
  userId: number;
  linkedUserId: number;
}

export interface MyRoomsStateInterface {
  ID: number;
  linkedUserId: number;
  lastMessage: string;
}

export interface MessagesState {
  myMessages: string[];
  receiverMessages: string[];
}
export interface MessageApiResponse {
  text: string,
  userID: number
}