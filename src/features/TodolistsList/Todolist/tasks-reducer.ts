import {todolistsActions} from './todolists-reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from '../../../api/tasks-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../../app/store';
import {appActions, AppActionsType} from '../../../app/app-reducer';

// A c t i o n s
export const taskActions = {
  removeTaskAC: (taskId: string, todolistId: string) => ({
    type: 'todolist/tasks/REMOVE-TASK', taskId, todolistId
  } as const),
  addTaskAC: (todolistId: string, task: TaskType) => ({
    type: 'todolist/tasks/ADD-TASK', todolistId, task
  } as const),
  changeTaskAC: (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: 'todolist/tasks/CHANGE-TASK', taskId, todolistId, model
  } as const),
  addTodolistAC: todolistsActions.addTodolistAC,
  removeTodolistAC: todolistsActions.removeTodolistAC,
  setTodolistsAC: todolistsActions.setTodolistsAC,
  setTasksAC: (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'todolist/tasks/SET-TASKS', todolistId, tasks
  } as const)
}

type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
type TasksActionsType = ReturnType<ActionType<typeof taskActions>>


// T y p e s
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

// S t a t e
const initialState: TasksStateType = {}


// R e d u c e r
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case 'todolist/tasks/REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      };
    case 'todolist/tasks/ADD-TASK':
      return {
        ...state,
        [action.todolistId]: [action.task, ...state[action.todolistId]
        ]
      };
    case 'todolist/tasks/CHANGE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.taskId ? {...t, ...action.model} : t)
      }
    case 'todolist/todolists/ADD-TODOLIST':
      return {
        [action.todolist.id]: [],
        ...state,
      }
    case 'todolist/todolists/REMOVE-TODOLIST':
      let stateCopy = {...state};
      delete stateCopy[action.todolistId];
      return stateCopy;
    case 'todolist/todolists/SET-TODOLISTS':
      const copyState = {...state}
      action.todolists.forEach(tl => {
        copyState[tl.id] = []
      })
      return copyState
    case 'todolist/tasks/SET-TASKS':
      return {
        ...state,
        [action.todolistId]: action.tasks
      }
    default:
      return state;
  }
}

// T h u n k
export const fetchTasksTC = (todolistId: string) => {
  return async (dispatch: Dispatch<TasksActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data = await tasksAPI.getTasks(todolistId)
      dispatch(taskActions.setTasksAC(todolistId, data.items))
      dispatch(appActions.setStatusAC('succeeded'))
    } catch {}
  }
}
export const createTaskTC = (taskTitle: string, todolistId: string) => {
  return async (dispatch: Dispatch<TasksActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data = await tasksAPI.createTask(todolistId, taskTitle)
      if (data.resultCode === 0) {
        dispatch(taskActions.addTaskAC(todolistId, data.data.item))
        dispatch(appActions.setStatusAC('succeeded'))
      } else {
        if (data.messages.length) {
          dispatch(appActions.setErrorAC(data.messages[0]))
          dispatch(appActions.setStatusAC('failed'))
        }
      }
    } catch {}
  }
}
export const deleteTaskTC = (taskId: string, todolistId: string) => {
  return async (dispatch: Dispatch<TasksActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data = await tasksAPI.deleteTask(todolistId, taskId)
      if (data.resultCode === 0) {
        dispatch(taskActions.removeTaskAC(taskId, todolistId))
        dispatch(appActions.setStatusAC('succeeded'))
      }
    } catch {}
  }
}
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export const updateTaskTC = (domainModel: UpdateDomainTaskModelType, taskId: string, todolistId: string) => {
  return async (dispatch: Dispatch<TasksActionsType | AppActionsType>, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      console.warn('Task is not found in state')
    } else {
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...domainModel
      }
      try {
        dispatch(appActions.setStatusAC('loading'))
        const data = await tasksAPI.updateTask(todolistId, taskId, apiModel)
        if (data.resultCode === 0) {
          dispatch(taskActions.changeTaskAC(todolistId, taskId, domainModel))
          dispatch(appActions.setStatusAC('succeeded'))
        }
      } catch {}
    }
  }
}