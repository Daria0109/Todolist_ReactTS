import axios from 'axios'
import {APIResponseType} from './todolists-api';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {'API-KEY': 'bcb04db8-51e3-4a52-abad-1b8669db5951'}
})

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
export type AuthDataType = {
  id: number
  email: string
  login: string
}


export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<APIResponseType<{userId: number}>>('auth/login', data)
      .then(res => res.data)
  },
  logout() {
    return instance.delete<APIResponseType>('auth/login')
      .then(res => res.data)
  },
  me() {
    return instance.get<APIResponseType<AuthDataType>>('auth/me')
      .then(res => res.data)
  }
}