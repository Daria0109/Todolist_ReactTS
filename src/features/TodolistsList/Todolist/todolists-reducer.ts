import {todolistsAPI, TodolistsType} from '../../../api/todolists-api';
import {Dispatch} from 'redux';
import {appActions, AppActionsType} from '../../../app/app-reducer';

// A c t i o n s
export const todolistsActions = {
  removeTodolistAC: (todolistId: string) => ({
    type: 'todolist/todolists/REMOVE-TODOLIST', todolistId
  } as const),
  addTodolistAC: (todolist: TodolistsType) => ({
    type: 'todolist/todolists/ADD-TODOLIST', todolist
  } as const),
  changeTodolistFilterAC: (filterValue: FilterType, todolistId: string) => ({
    type: 'todolist/todolists/CHANGE-TODOLIST-FILTER', filterValue, todolistId
  } as const),
  changeTodolistTitleAC: (title: string, todolistId: string) => ({
    type: 'todolist/todolists/CHANGE-TODOLIST-TITLE', title, todolistId
  } as const),
  setTodolistsAC: (todolists: Array<TodolistsType>) => ({
    type: 'todolist/todolists/SET-TODOLISTS', todolists
  } as const)
}

type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
type TodolistsActionsType = ReturnType<ActionType<typeof todolistsActions>>

// T y p e s
export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistsType & {
  filter: FilterType
}

// S t a t e
const initialState: Array<TodolistDomainType> = []

// R e d u c e r
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'todolist/todolists/REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.todolistId);
    case 'todolist/todolists/ADD-TODOLIST':
      return [
        {...action.todolist, filter: 'all'},
        ...state,
      ]
    case 'todolist/todolists/CHANGE-TODOLIST-FILTER':
      return state.map(tl =>
        tl.id === action.todolistId ? {...tl, filter: action.filterValue} : tl)
    case 'todolist/todolists/CHANGE-TODOLIST-TITLE':
      return state.map(tl =>
        tl.id === action.todolistId ? {...tl, title: action.title} : tl)
    case 'todolist/todolists/SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
      return state;
  }
}

// T h u n k
export const fetchTodolistsTC = () => {
  return async (dispatch: Dispatch<TodolistsActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data = await todolistsAPI.getTodolists()
      dispatch(todolistsActions.setTodolistsAC(data))
      dispatch(appActions.setStatusAC('succeeded'))
    } catch {
    }
  }
}
export const deleteTodolistTC = (todolistId: string) => {
  return async (dispatch: Dispatch<TodolistsActionsType | AppActionsType> ) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data = await todolistsAPI.deleteTodolist(todolistId)
      if (data.resultCode === 0) {
        dispatch(todolistsActions.removeTodolistAC(todolistId))
        dispatch(appActions.setStatusAC('succeeded'))
      }
    } catch {}
  }
}
export const createTodolistTC = (title: string) => {
  return async (dispatch: Dispatch<TodolistsActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data = await todolistsAPI.createTodolist(title)
      if (data.resultCode === 0) {
        dispatch(todolistsActions.addTodolistAC(data.data.item))
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
export const updateTodolistTC = (editedTitle: string, todoListId: string) => {
  return async (dispatch: Dispatch<TodolistsActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data = await todolistsAPI.updateTodolist(todoListId, editedTitle)
      if (data.resultCode === 0) {
        dispatch(todolistsActions.changeTodolistTitleAC(editedTitle, todoListId))
        dispatch(appActions.setStatusAC('succeeded'))
      }
    } catch {}
  }
}