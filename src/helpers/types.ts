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
  linkedUser: number;
}
export interface SendMessageInterface {
  roomID: number;
  text: string
}