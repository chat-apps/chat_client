import axios from "axios"
import { BASE_URL } from "../common"
import { SendMessageInterface } from "./types"

const sendMessage = async (body: SendMessageInterface, token: string) => {
    return axios.post(
        `${BASE_URL}/message/createMessage`, body, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }
    ).then((res) => {
        return res.data
    })
}

const getRoomMessages = async (roomId: number, secondRoomID: number, token: string) => {
    return axios.get(
        `${BASE_URL}/message/getRoomMessages/${roomId}/${secondRoomID}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    }
    ).then((res) => {
        return res.data
    })
}

const deleteMessageApi = async (messageId: number, token: string) => {
    return axios.delete(
        `${BASE_URL}/message/delete-message/${messageId}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    }
    ).then((res) => {
        return res.data
    })
}


export { sendMessage, getRoomMessages, deleteMessageApi }
