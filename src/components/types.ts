export interface ChatBoxInterface {
  receivedMessage: any;
  sendMessage: (args: string) => void;
  myMessages: any
}