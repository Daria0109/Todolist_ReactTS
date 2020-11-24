import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';

export const removeTodolistAC = (todolistId: string) => ({
  type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (title: string) => ({
  type: 'ADD-TODOLIST', title, todolistId: v1()} as const)
export const changeTodolistFilterAC = (filterValue: FilterType, todolistId: string) => ({
  type: 'CHANGE-TODOLIST-FILTER', filterValue, todolistId} as const)
export const changeTodolistTitleAC = (title: string, todolistId: string) => ({
  type: 'CHANGE-TODOLIST-TITLE', title, todolistId} as const)

type ActionsType = ReturnType <typeof removeTodolistAC>
  | ReturnType <typeof addTodolistAC>
  | ReturnType <typeof changeTodolistFilterAC>
  | ReturnType <typeof changeTodolistTitleAC>

const todoListID1: string = v1();
const todoListID2: string = v1();
const initialState: Array<TodoListType> = []

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
  switch(action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.todolistId);
    case 'ADD-TODOLIST':
      return [
        ...state,
        {id: action.todolistId, title: action.title, filter: 'all'}
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