import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {todolistsActions} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/tasks-api';

// A c t i o n s
export const taskActions = {
  removeTaskAC: (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const),
  addTaskAC: (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId, id: v1()} as const),
  changeTaskStatusAC: (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS', taskId, status, todolistId} as const),
  changeTaskTitleAC: (title: string, taskId: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE', title, taskId, todolistId} as const),
  addTodolistAC: todolistsActions.addTodolistAC,
  removeTodolistAC: todolistsActions.removeTodolistAC
}

type ActionType<T> = T extends {[key: string]: infer U} ? U : never;
type ActionsType =  ReturnType<ActionType<typeof taskActions>>

// S t a t e
const initialState: TasksStateType = {}


// R e d u c e r
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
          {id: action.id, title: action.title, status: TaskStatuses.New, addedDate: '', deadline: '',
          description: '', order: 0, priority: TaskPriorities.High, startDate: '', todoListId: action.todolistId},
          ...state[action.todolistId]
        ]
      };
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.taskId ? {...t, status: action.status} : t)
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