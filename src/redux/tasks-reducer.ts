import {v1} from 'uuid';
import {todolistsActions} from './todolists-reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from '../api/tasks-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

// A c t i o n s
export const taskActions = {
  removeTaskAC: (taskId: string, todolistId: string) => ({
    type: 'app/tasks/REMOVE-TASK', taskId, todolistId
  } as const),
  addTaskAC: (todolistId: string, task: TaskType) => ({
    type: 'app/tasks/ADD-TASK', todolistId, task
  } as const),
  changeTaskAC: (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: 'app/tasks/CHANGE-TASK', taskId, todolistId, model
  } as const),
  addTodolistAC: todolistsActions.addTodolistAC,
  removeTodolistAC: todolistsActions.removeTodolistAC,
  setTodolistsAC: todolistsActions.setTodolistsAC,
  setTasksAC: (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'app/tasks/SET-TASKS', todolistId, tasks
  } as const)
}

type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
type ActionsType = ReturnType<ActionType<typeof taskActions>>


// T y p e s
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

// S t a t e
const initialState: TasksStateType = {}


// R e d u c e r
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'app/tasks/REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      };
    case 'app/tasks/ADD-TASK':
      return {
        ...state,
        [action.todolistId]: [action.task,
          ...state[action.todolistId]
        ]
      };
    case 'app/tasks/CHANGE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.taskId ? {...t, ...action.model} : t)
      }
    case 'app/todolists/ADD-TODOLIST':
      return {
        [action.todolist.id]: [],
        ...state,
      }
    case 'app/todolists/REMOVE-TODOLIST':
      let stateCopy = {...state};
      delete stateCopy[action.todolistId];
      return stateCopy;
    case 'app/todolists/SET-TODOLISTS':
      const copyState = {...state}
      action.todolists.forEach(tl => {
        copyState[tl.id] = []
      })
      return copyState
    case 'app/tasks/SET-TASKS':
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
  return (dispatch: Dispatch<ActionsType>) => {
    tasksAPI.getTasks(todolistId)
      .then(data => dispatch(taskActions.setTasksAC(todolistId, data.items)))
  }
}
export const createTaskTC = (taskTitle: string, todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    tasksAPI.createTask(todolistId, taskTitle)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(taskActions.addTaskAC(todolistId, data.data.item))
        }
      })
  }
}
export const deleteTaskTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    tasksAPI.deleteTask(todolistId, taskId)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(taskActions.removeTaskAC(taskId, todolistId))
        }
      })
  }
}
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
export const updateTaskTC = (domainModel: UpdateDomainTaskModelType, taskId: string, todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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
      tasksAPI.updateTask(todolistId, taskId, apiModel)
        .then(data => {
          if (data.resultCode === 0) {
            dispatch(taskActions.changeTaskAC(todolistId, taskId, domainModel))
          }
        })
    }
  }
}