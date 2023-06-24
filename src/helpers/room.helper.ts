import axios from "axios"
import { BASE_URL } from "../common"
import { CreateRoomInterface } from "./types"

const createRoom = async (body: CreateRoomInterface, token: string) => {
    return axios.post(
        `${BASE_URL}/room/createChat`, body, {
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
        `${BASE_URL}/room/getUserChats`, {
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

const getRoomById = async (token: string, roomId: number) => {
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

const getRoomByLinkedUserId = async (token: string, linkedUserId: number) => {
    return axios.get(
        `${BASE_URL}/room/getRoomByLinkedUserId/${linkedUserId}`, {
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


export { createRoom, getUserRooms, getRoomById, getRoomByLinkedUserId }