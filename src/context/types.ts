export interface SocketContextInterface {
  state: SocketStateInterface;
  handleSetActiveUsers: (args: number[]) => void;
}

export interface SocketStateInterface {
  activeUsers: number[] | []
}
export interface UserContextInterface {
  state: UserStateInterface;
  handleSetToken: (args: string) => void;
  handleSetUser: (args: any) => void;
}

export interface UserStateInterface {
  username: string | null;
  token: string | null;
  userID: number | null;
}