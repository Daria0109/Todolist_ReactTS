import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {'API-KEY': 'bcb04db8-51e3-4a52-abad-1b8669db5951'}
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

