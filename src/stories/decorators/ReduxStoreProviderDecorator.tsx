import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../features/TodolistsList/Todolist/tasks-reducer';
import {todolistsReducer} from '../../features/TodolistsList/Todolist/todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/tasks-api';
import thunk from 'redux-thunk'
import {appReducer} from '../../app/app-reducer';
import { authReducer } from '../../features/Login/auth-reducer';


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer
})

const initialGlobalState = {
  todolists: [
    {id: 'todoListID1', title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
    {id: 'todoListID2', title: 'What to bue', filter: 'all', order: 0, addedDate: '', entityStatus: 'loading'}
  ] ,
  tasks: {
    ['todoListID1']:
      [
        {
          id: v1(), title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todoListID1'
        },
        {
          id: v1(), title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todoListID1'
        },
        {
          id: v1(), title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todoListID1'
        }
      ],
    ['todoListID2']:
      [
        {
          id: v1(), title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'loading', todoListId: 'todolistId2'
        },
        {
          id: v1(), title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: v1(), title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'loading', todoListId: 'todolistId2'
        }
      ],
  },
  app: {
    status: 'idle',
    error: null,
    isAppInitialized: false
  },
  auth: {
    isLoggedIn: false,
    login: null
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: Function) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}