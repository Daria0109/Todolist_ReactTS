import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../redux/tasks-reducer';
import {todolistsReducer} from '../../redux/todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/tasks-api';


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const initialGlobalState = {
  todolists: [
    {id: 'todoListID1', title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: 'todoListID2', title: 'What to bue', filter: 'all', order: 0, addedDate: ''}
  ] ,
  tasks: {
    ['todoListID1']:
      [
        {
          id: v1(), title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todoListID1'
        },
        {
          id: v1(), title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todoListID1'
        },
        {
          id: v1(), title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todoListID1'
        }
      ],
    ['todoListID2']:
      [
        {
          id: v1(), title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: v1(), title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: v1(), title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId2'
        }
      ],
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: Function) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}