import {v1} from 'uuid';
import {TodolistsType} from '../api/todolists-api';

// A c t i o n s
export const todolistsActions = {
  removeTodolistAC: (todolistId: string) => ({
    type: 'REMOVE-TODOLIST', todolistId
  } as const),
  addTodolistAC: (title: string) => ({
    type: 'ADD-TODOLIST', title, todolistId: v1()
  } as const),
  changeTodolistFilterAC: (filterValue: FilterType, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER', filterValue, todolistId
  } as const),
  changeTodolistTitleAC: (title: string, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', title, todolistId
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
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.todolistId);
    case 'ADD-TODOLIST':
      return [
        ...state,
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
          addedDate: '',
          order: 0
        }
      ]
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl =>
        tl.id === action.todolistId ? {...tl, filter: action.filterValue} : tl)
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl =>
        tl.id === action.todolistId ? {...tl, title: action.title} : tl)
    default:
      return state;
  }
}