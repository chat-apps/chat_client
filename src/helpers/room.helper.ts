import axios from "axios"
import { BASE_URL } from "../common"
import { CreateRoomInterface } from "./types"

const createRoom = async (body: CreateRoomInterface, token: string) => {
    return axios.post(
        `${BASE_URL}/room/create-room`, body, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    }
    ).then((res) => {
        return res.data
    }).catch((error) => {
        return error.response.data.error
    })
}

const getUserRooms = async (token: string) => {
    return axios.get(
        `${BASE_URL}/room/get-user-rooms`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    }
    ).then((res) => {
        return res.data
    }).catch((error) => {
        return error.response.data.error
    })
}

const getRoomById = async (roomId: number, token: string) => {
    return axios.get(
        `${BASE_URL}/room/getRoomById/${roomId}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    }
    ).then((res) => {
        return res.data
    }).catch((error) => {
        return error.response.data.error
    })
}

const acceptRoomRequest = async (roomId: number, token: string) => {
    return axios.patch(
        `${BASE_URL}/room/accept-room-request/${roomId}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    }
    ).then((res) => {
        return res.data
    }).catch((error) => {
        return error.response.data.error
    })
}

const getRoomsRequests = async (token: string) => {
    return axios.get(
        `${BASE_URL}/room/get-rooms-requests`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    }
    ).then((res) => {
        return res.data
    }).catch((error) => {
        return error.response.data.error
    })
}

const getSentRequests = async (token: string) => {
    return axios.get(
        `${BASE_URL}/room/get-sent-requests`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    }
    ).then((res) => {
        return res.data
    }).catch((error) => {
        return error.response.data.error
    })
}

export { createRoom, getUserRooms, getSentRequests, getRoomById, getRoomsRequests, acceptRoomRequest }