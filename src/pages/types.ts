export interface SocketsObject {
    userId: number,
    socketId: number
}

export interface MyRoomsStateInterface {
    ID: number;
    userName: string;
    activeStatus: boolean;
    status: boolean;
    linkedUserId: number;
    lastMessage?: string;
}

export interface RequestedRoomsInterface {
    ReceiveRequests: RequestsInterface[]
    SentRequests: RequestsInterface[]
}

export interface RequestsInterface {
    ID: number;
    userName: string;
    userId: number;
}