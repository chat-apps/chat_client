



export interface AvatarPropsInterface {
  name: string;
}

export interface LoaderPropsInterface {
  isLoading: boolean;
}


export interface MessageStateInterface {
  userID: number;
  text: string;
  createdAt: string;
  ID: number;
}

export interface SendMessageToSocketInterface {
  userID: number,
  text: string,
  roomID: number,
  linkedUserID: number
}
