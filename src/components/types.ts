



export interface AvatarPropsInterface {
  name: string;
}

export interface LoaderPropsInterface {
  isLoading: boolean;
}


export interface MessagesState {
  myMessages: string[];
  receiverMessages: string[];
}
export interface MessageApiResponse {
  text: string,
  userID: number
}