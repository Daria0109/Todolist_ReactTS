import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

export const removeTaskAC = (taskId: string, todolistId: string) => ({
  type: 'REMOVE-TASK', taskId, todolistId
} as const)
export const addTaskAC = (title: string, todolistId: string) => ({
  type: 'ADD-TASK', title, todolistId, id: v1()
} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
  type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId
} as const)
export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string) => ({
  type: 'CHANGE-TASK-TITLE', title, taskId, todolistId
} as const)

type ActionsType = ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>

const todoListID1: string = v1();
const todoListID2: string = v1();
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      };
    case 'ADD-TASK':
      return {
        ...state,
        [action.todolistId]: [
          {id: action.id, title: action.title, isDone: false},
          ...state[action.todolistId]
        ]
      };
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.taskId ? {...t, isDone: action.isDone} : t)
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.taskId ? {...t, title: action.title} : t)
      }
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.todolistId]: []
      }
    case 'REMOVE-TODOLIST':
      let stateCopy = {...state};
      delete stateCopy[action.todolistId];
      return stateCopy;
    default:
      return state;
  }
}