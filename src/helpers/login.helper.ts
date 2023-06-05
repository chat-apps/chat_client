import axios from "axios"
import { BASE_URL } from "../common"
import { LoginUserInterface, SignUpUserInterface } from "./types"

const signUpApi = async (body: SignUpUserInterface) => {
  try {
    return axios.post(
      `${BASE_URL}/user/register`, body, {
      headers: { 'Content-Type': 'application/json' }
    }
    )
  } catch (error) {
    console.error(error)
  }
}

const loginApi = async (body: LoginUserInterface) => {
  try {
    return axios.post(
      `${BASE_URL}/user/login`, body, {
      headers: { 'Content-Type': 'application/json' }
    }
    )
  } catch (error) {
    console.error(error)
  }
}


export { signUpApi, loginApi }