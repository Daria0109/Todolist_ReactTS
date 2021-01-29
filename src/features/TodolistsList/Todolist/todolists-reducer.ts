import {v1} from 'uuid';
import {todolistsAPI, TodolistsType} from '../../../api/todolists-api';
import {Dispatch} from 'redux';
import {taskActions} from './tasks-reducer';

// A c t i o n s
export const todolistsActions = {
  removeTodolistAC: (todolistId: string) => ({
    type: 'app/todolists/REMOVE-TODOLIST', todolistId
  } as const),
  addTodolistAC: (todolist: TodolistsType) => ({
    type: 'app/todolists/ADD-TODOLIST', todolist
  } as const),
  changeTodolistFilterAC: (filterValue: FilterType, todolistId: string) => ({
    type: 'app/todolists/CHANGE-TODOLIST-FILTER', filterValue, todolistId
  } as const),
  changeTodolistTitleAC: (title: string, todolistId: string) => ({
    type: 'app/todolists/CHANGE-TODOLIST-TITLE', title, todolistId
  } as const),
  setTodolistsAC: (todolists: Array<TodolistsType>) => ({
    type: 'app/todolists/SET-TODOLISTS', todolists
  } as const)
}

type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
type ActionsType = ReturnType<ActionType<typeof todolistsActions>>

// T y p e s
export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistsType & {
  filter: FilterType
}

// S t a t e
const initialState: Array<TodolistDomainType> = []

// R e d u c e r
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'app/todolists/REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.todolistId);
    case 'app/todolists/ADD-TODOLIST':
      return [
        {...action.todolist, filter: 'all'},
        ...state,
      ]
    case 'app/todolists/CHANGE-TODOLIST-FILTER':
      return state.map(tl =>
        tl.id === action.todolistId ? {...tl, filter: action.filterValue} : tl)
    case 'app/todolists/CHANGE-TODOLIST-TITLE':
      return state.map(tl =>
        tl.id === action.todolistId ? {...tl, title: action.title} : tl)
    case 'app/todolists/SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
      return state;
  }
}

// T h u n k
export const fetchTodolistsTC = () => {
  return async (dispatch: Dispatch<ActionsType>) => {
    const data = await todolistsAPI.getTodolists()
    dispatch(todolistsActions.setTodolistsAC(data))
  }
}
export const deleteTodolistTC = (todolistId: string) => {
  return async (dispatch: Dispatch<ActionsType>) => {
    const data = await todolistsAPI.deleteTodolist(todolistId)
    if (data.resultCode === 0) {
      dispatch(todolistsActions.removeTodolistAC(todolistId))
    }
  }
}
export const createTodolistTC = (title: string) => {
  return async (dispatch: Dispatch<ActionsType>) => {
    const data = await todolistsAPI.createTodolist(title)
    if (data.resultCode === 0) {
      dispatch(todolistsActions.addTodolistAC(data.data.item))
    }
  }
}
export const updateTodolistTC = (editedTitle: string, todoListId: string) => {
  return async (dispatch: Dispatch<ActionsType>) => {
    const data = await todolistsAPI.updateTodolist(todoListId, editedTitle)
    if (data.resultCode === 0) {
      dispatch(todolistsActions.changeTodolistTitleAC(editedTitle, todoListId))
    }
  }
}