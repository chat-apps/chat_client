export interface SignUpUserInterface {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserInterface {
  name: string;
  email: string;
  password: string;
}
export interface CreateRoomInterface {
  linkedUserID: number;
}
export interface SendMessageInterface {
  roomID: number;
  text: string
  secondRoomID: number;
}

export interface GetRoomsRequestApiRes {
  success: boolean;
  data: [
    {
      ID: number;
      status: boolean;
      createdAt: Date;
      updatedAt: Date;
      userID: number;
      linkedUserId: number;
      user: User;
    }
  ]
}

export interface User {
  ID: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
