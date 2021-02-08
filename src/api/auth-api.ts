import axios from 'axios'
import {APIResponseType} from './todolists-api';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {'API-KEY': '36d1ca6d-3b4d-4bd9-8dd7-68536850a338'}
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