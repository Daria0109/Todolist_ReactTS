import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer';
import thunk from 'redux-thunk';
import appReducer from './app-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;