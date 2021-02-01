import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {createTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from './Todolist/tasks-reducer';
import {
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  FilterType,
  TodolistDomainType,
  todolistsActions, updateTodolistTC
} from './Todolist/todolists-reducer';
import React, {useCallback, useEffect} from 'react';
import {TaskStatuses} from '../../api/tasks-api';
import {Grid, Paper} from '@material-ui/core';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/TodoList';


const TodolistsList = () => {
  const dispatch = useDispatch();
  let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
  let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  const addTask = useCallback((taskTitle: string, todolistId: string) => {
    dispatch(createTaskTC(taskTitle, todolistId))
  }, [dispatch])

  const removeTask = useCallback((taskId: string, todolistId: string) => {
    dispatch(deleteTaskTC(taskId, todolistId))
  }, [dispatch])

  const changeTaskStatus = useCallback((status: TaskStatuses, taskId: string, todolistId: string) => {
    dispatch(updateTaskTC({status}, taskId, todolistId))
  }, [dispatch])

  const editTaskTitle = useCallback((editedTitle: string, taskId: string, todolistId: string) => {
    dispatch(updateTaskTC({title: editedTitle}, taskId, todolistId))
  }, [dispatch])

  const changeFilter = useCallback((value: FilterType, todoListId: string) => {
    dispatch(todolistsActions.changeTodolistFilterAC(value, todoListId))
  }, [dispatch])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(deleteTodolistTC(todolistId));
  }, [dispatch])

  const addTodolist = useCallback((title: string) => {
    dispatch(createTodolistTC(title))
  }, [dispatch])

  const editTodoListTitle = useCallback((editedTitle: string, todoListId: string) => {
    dispatch(updateTodolistTC(editedTitle, todoListId))
  }, [dispatch])
  return <>
    <Grid container style={{padding: '10px'}}>
      <AddItemForm addItem={addTodolist}/>
    </Grid>
    <Grid container spacing={3}>
      {todolists.map(tl => {
        let tasksForTodoList = tasks[tl.id];
        return <Grid item key={tl.id}>
          <Paper style={{padding: '20px', backgroundColor: 'powderblue'}}>
            <Todolist todolist={tl}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      removeTodoList={removeTodolist}
                      editTaskTitle={editTaskTitle}
                      editTodoListTitle={editTodoListTitle}/>
          </Paper>
        </Grid>
      })}
    </Grid>
  </>
}

export default TodolistsList;