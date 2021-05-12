import {todolistsAPI, TodolistsType} from '../../../api/todolists-api';
import {Dispatch} from 'redux';
import {handleServerAppError, handleServerNetworkError} from '../../../helpers/error-helpers';
import { RequestStatusType, setStatus } from '../../../app/app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// T y p e s
export type FilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistsType & {
  filter: FilterType
  entityStatus: RequestStatusType
}

// S t a t e
const initialState: Array<TodolistDomainType> = []

// S l i c e
const todolistsSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    removeTodolist: (state, action: PayloadAction<{todolistId: string}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    addTodolist: (state, action: PayloadAction<{todolist: TodolistsType}>) => {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
    },
    changeTodolistFilter: (state, action: PayloadAction<{filterValue: FilterType, todolistId: string}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      if (index > -1) {
        state[index].filter = action.payload.filterValue
      }
    },
    changeTodolistTitle: (state, action: PayloadAction<{title: string, todolistId: string}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      if (index > -1) {
        state[index].title = action.payload.title
      }
    },
    setTodolists: (state, action: PayloadAction<{todolists: Array<TodolistsType>}>) => {
      return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
    },
    changeEntityStatus: (state, action: PayloadAction<{todolistId: string, entityStatus: RequestStatusType}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      if (index > -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    }
  }
})

// R e d u c e r
export const todolistsReducer = todolistsSlice.reducer;
export const {setTodolists, addTodolist, changeEntityStatus,
changeTodolistFilter, changeTodolistTitle, removeTodolist} = todolistsSlice.actions

// T h u n k
export const fetchTodolistsTC = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({status: 'loading'}))
      const data = await todolistsAPI.getTodolists()
      dispatch(setTodolists({todolists: data}))
      dispatch(setStatus({status: 'succeeded'}))
    } catch(error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}
export const deleteTodolistTC = (todolistId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({status: 'loading'}))
      dispatch(changeEntityStatus({todolistId, entityStatus: 'loading'}))
      const data = await todolistsAPI.deleteTodolist(todolistId)
      if (data.resultCode === 0) {
        dispatch(removeTodolist({todolistId}))
        dispatch(setStatus({status: 'succeeded'}))
      }
    } catch(error) {
      handleServerNetworkError(error, dispatch)
      dispatch(changeEntityStatus({todolistId, entityStatus: 'failed'}))
    }
  }
}
export const createTodolistTC = (title: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({status: 'loading'}))
      const data = await todolistsAPI.createTodolist(title)
      if (data.resultCode === 0) {
        dispatch(addTodolist({todolist: data.data.item}))
        dispatch(setStatus({status: 'succeeded'}))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch(error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}
export const updateTodolistTC = (editedTitle: string, todolistId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({status: 'loading'}))
      const data = await todolistsAPI.updateTodolist(todolistId, editedTitle)
      if (data.resultCode === 0) {
        dispatch(changeTodolistTitle({title: editedTitle, todolistId}))
        dispatch(setStatus({status: 'succeeded'}))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch(error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}