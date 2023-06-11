export interface ChatBoxPropsInterface {
  receivedMessage: string[];
  sendMessage: (args: string) => void;
  myMessages: string[];
  room: RoomPropsInterface;
}

export interface ChatListPropsInterface {
  lastMessage: string;
  name: string;
  status: boolean;
  onClick: (args: RoomPropsInterface) => void;
}

export interface AvatarPropsInterface {
  name: string;
}

export interface LoaderPropsInterface {
  isLoading: boolean;
}
export interface RoomPropsInterface {
  username: string;
  status: boolean;
}