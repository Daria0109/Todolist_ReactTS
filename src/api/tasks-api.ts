import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
  withCredentials: true,
  headers: {'API-KEY': 'bcb04db8-51e3-4a52-abad-1b8669db5951'}
})

type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type GetResponseTaskType = {
  items: Array<TaskType>
  totalCount: number
  error: string
}
type CommonResponseTaskType<T = {}> = {
  data: T
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
}
type PutRequestBodyType = {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: null
}
const PutRequestBody: PutRequestBodyType = {
  title: '',
  description: 'super task',
  completed: false,
  status: 1,
  priority: 1,
  startDate: '11.12.2020',
  deadline: null
}
export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetResponseTaskType>(`${todolistId}/tasks?count=10&page=1`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<CommonResponseTaskType<{item: Array<TaskType>}>>(`${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<CommonResponseTaskType>(`${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<CommonResponseTaskType<{item: Array<TaskType>}>>(`${todolistId}/tasks/${taskId}`, {...PutRequestBody, title: title})
  }
}