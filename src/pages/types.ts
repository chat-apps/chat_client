export interface MyRoomsStateInterface {
    ID: number;
    userName: string;
    linkedUserID: number;
    lastMessage?: string;
}

export interface ActiveRoomInterface {
    ID: number;
    userName: string;
    status: boolean;
    secondRoomID: number;
    linkedUserID: number;
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