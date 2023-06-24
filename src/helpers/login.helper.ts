import axios from "axios"
import { BASE_URL } from "../common"
import { LoginUserInterface, SignUpUserInterface } from "./types"

const signUpApi = async (body: SignUpUserInterface) => {
  return axios.post(
    `${BASE_URL}/user/register`, body, {
    headers: { 'Content-Type': 'application/json' }
  }
  ).then((res) => {
    return res.data
  }).catch((error) => {
    return error.response.data.error || error.response.data.errors[0].msg
  })
}

const loginApi = async (body: LoginUserInterface) => {
  return axios.post(
    `${BASE_URL}/user/login`, body, {
    headers: { 'Content-Type': 'application/json' }
  }
  ).then((res) => {
    return res.data
  }).catch((error) => {
    return error.response.data.error || error.response.data.errors[0].msg
  })
}

const getAllUsers = async (token: string) => {
  return axios.get(
    `${BASE_URL}/user/getAllUsers`, {
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


export { signUpApi, loginApi, getAllUsers }