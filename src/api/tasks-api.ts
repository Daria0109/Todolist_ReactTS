import axios from 'axios'
import {APIResponseType} from './todolists-api';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
  withCredentials: true,
  headers: {'API-KEY': '36d1ca6d-3b4d-4bd9-8dd7-68536850a338'}
})


export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Late = 4
}

export type TaskType = {
  addedDate: string
  deadline: string
  description: string
  id: string
  order: number
  priority: TaskPriorities
  startDate: string
  status: TaskStatuses
  title: string
  todoListId: string
}

type GetResponseTaskType = {
  items: Array<TaskType>
  totalCount: number
  error: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetResponseTaskType>(`${todolistId}/tasks`)
      .then(res => res.data)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<APIResponseType<{ item: TaskType }>>(`${todolistId}/tasks`, {title})
      .then(res => res.data)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<APIResponseType>(`${todolistId}/tasks/${taskId}`)
      .then(res => res.data)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<APIResponseType<{ item: TaskType}>>(`${todolistId}/tasks/${taskId}`, model)
      .then(res => res.data)
  }
}