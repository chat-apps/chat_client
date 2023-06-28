export interface GetRoomApiRes {
    ID: number;
    createdAt: Date;
    updatedAt: Date;
    userID: number;
    status: boolean;
    linkedUserId: number;
    linkedUser: LinkedUser;
    user: LinkedUser;
    messages: any[];
}

export interface LinkedUser {
    ID: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateMessageRes {
    userID: number,
    text: string,
}