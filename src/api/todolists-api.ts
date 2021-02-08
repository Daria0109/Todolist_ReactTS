import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {'API-KEY': '36d1ca6d-3b4d-4bd9-8dd7-68536850a338'}
})

export type TodolistsType = {
  id: string
  addedDate: string
  order: number
  title: string
}
export type APIResponseType<T = {}> = {
  data: T
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
}


export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistsType>>('todo-lists')
      .then(res => res.data)
  },
  createTodolist(title: string) {
    return instance.post<APIResponseType<{item: TodolistsType}>>('todo-lists', {title})
      .then(res => res.data)
  },
  deleteTodolist(todolistID: string) {
    return instance.delete<APIResponseType>(`todo-lists/${todolistID}`)
      .then(res => res.data)
  },
  updateTodolist(todolistID: string, title: string) {
    return instance.put<APIResponseType>(`todo-lists/${todolistID}`, {title})
      .then(res => res.data)
  }
}

