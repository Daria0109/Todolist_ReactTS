import {addTodolist, removeTodolist, setTodolists} from './todolists-reducer';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from '../../../api/tasks-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../../app/store';
import {handleServerAppError, handleServerNetworkError} from '../../../helpers/error-helpers';
import {RequestStatusType, setStatus} from '../../../app/app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// T y p e s
export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType
}
export type TasksStateType = {
  [key: string]: Array<TaskDomainType>
}

// S t a t e
const initialState: TasksStateType = {}

// S l i c e
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ todolistId: string, task: TaskType }>) => {
      const tasks = state[action.payload.todolistId];
      tasks.unshift({...action.payload.task, entityStatus: 'idle'})
    },
    changeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.model}
      }
    },
    setTasks: (state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) => {
      state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}));
    },
    changeEntityStatus: (state, action: PayloadAction<{ todolistId: string, taskId: string, status: RequestStatusType }>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index].entityStatus = action.payload.status
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodolist, (state, action) => {
      state[action.payload.todolist.id] = []
    });
    builder.addCase(removeTodolist, (state, action) => {
      delete state[action.payload.todolistId]
    });
      builder.addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach(tl => {
          state[tl.id] = []
        })
      })
  }
})

// R e d u c e r
export const tasksReducer = tasksSlice.reducer;
export const {changeEntityStatus, setTasks, addTask, changeTask, removeTask} = tasksSlice.actions


// T h u n k
export const fetchTasksTC = (todolistId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({status: 'loading'}))
      const data = await tasksAPI.getTasks(todolistId)
      dispatch(setTasks({todolistId, tasks: data.items}))
      dispatch(setStatus({status: 'succeeded'}))
    } catch (error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}
export const createTaskTC = (taskTitle: string, todolistId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({status: 'loading'}))
      const data = await tasksAPI.createTask(todolistId, taskTitle)
      if (data.resultCode === 0) {
        dispatch(addTask({todolistId, task: data.data.item}))
        dispatch(setStatus({status: 'succeeded'}))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}
export const deleteTaskTC = (taskId: string, todolistId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({status: 'loading'}))
      dispatch(changeEntityStatus({todolistId, taskId, status: 'loading'}))
      const data = await tasksAPI.deleteTask(todolistId, taskId)
      if (data.resultCode === 0) {
        dispatch(removeTask({taskId, todolistId}))
        dispatch(setStatus({status: 'succeeded'}))
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      dispatch(changeEntityStatus({todolistId, taskId, status: 'failed'}))
    }
  }
}
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export const updateTaskTC = (domainModel: UpdateDomainTaskModelType, taskId: string, todolistId: string) => {
  return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      console.warn('Task is not found in state')
    } else {
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...domainModel
      }
      try {
        dispatch(setStatus({status: 'loading'}))
        dispatch(changeEntityStatus({todolistId, taskId, status: 'loading'}))
        const data = await tasksAPI.updateTask(todolistId, taskId, apiModel)
        if (data.resultCode === 0) {
          dispatch(changeTask({todolistId, taskId, model: domainModel}))
          dispatch(setStatus({status: 'succeeded'}))
          dispatch(changeEntityStatus({todolistId, taskId, status: 'succeeded'}))
        } else {
          handleServerAppError(data, dispatch)
          dispatch(changeEntityStatus({todolistId, taskId, status: 'failed'}))
        }
      } catch (error) {
        handleServerNetworkError(error, dispatch)
        dispatch(changeEntityStatus({todolistId, taskId, status: 'failed'}))
      }
    }
  }
}