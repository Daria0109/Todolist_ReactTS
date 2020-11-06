import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';

export type removeTodoListAT = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type addTodoListAT = {
  type: 'ADD-TODOLIST'
  title: string
}
export type changeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string,
  title: string
}
export type changeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterType
}
export type ActionType = removeTodoListAT | addTodoListAT | changeTodoListTitleAT | changeTodoListFilterAT

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {
    case('REMOVE-TODOLIST'):
      return state.filter(tl => tl.id !== action.id);
    case('ADD-TODOLIST'):
      let newTodoList: TodoListType = {id: v1(), title: action.title, filter: 'all'};
      return [
        ...state,
        newTodoList
      ];
    case('CHANGE-TODOLIST-TITLE'):
      let newTodoLists = state.map(tl => {
        if (tl.id === action.id) {
          return {...tl, title: tl.title = action.title}
        }
        return tl
      })
      return newTodoLists;
    case('CHANGE-TODOLIST-FILTER'):
      const todoList = state.find(tl => tl.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
        return [...state];
    default:
      return state;
  }
}

export const removeTodoListAC = (id: string): removeTodoListAT => ({type: 'REMOVE-TODOLIST',id});
export const addTodoListAC = (title: string): addTodoListAT => ({type: 'ADD-TODOLIST',
  title})