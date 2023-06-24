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
    }).catch((error) => {
        return error.response.data.error
    })
}

const getRoomMessages = async (roomId: number, token: string) => {
    return axios.get(
        `${BASE_URL}/message/getRoomMessages/${roomId}`, {
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


export { sendMessage, getRoomMessages }
