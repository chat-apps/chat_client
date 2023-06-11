export interface SocketContextInterface {
  state: SocketStateInterface;
  handleSetActiveUsers: (args: number[]) => void;
}

export interface SocketStateInterface {
  activeUsers: number[] | []
}
export interface UserStateInterface {
  userID: number;
  username: string | null;
  token: string | null;
}

export interface UserContextInterface {
  state: UserStateInterface;
  handleSetUser: (items: any) => void;
  handleSetToken: (item: string) => void;
}