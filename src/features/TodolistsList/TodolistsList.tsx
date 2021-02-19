import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {createTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from './Todolist/tasks-reducer';
import {
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  FilterType,
  TodolistDomainType, updateTodolistTC, changeTodolistFilter
} from './Todolist/todolists-reducer';
import React, {useCallback, useEffect} from 'react';
import {TaskStatuses} from '../../api/tasks-api';
import {createStyles, Grid, makeStyles, Paper, Theme} from '@material-ui/core';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/TodoList';
import {Redirect} from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '15px',
      backgroundColor: '#e09f3e'
    },
    addItemFormGrid: {
      padding: '20px',
    }
  })
);

const TodolistsList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  const classes = useStyles();

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
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

  const changeFilter = useCallback((value: FilterType, todolistId: string) => {
    dispatch(changeTodolistFilter({filterValue: value, todolistId}))
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

  if (!isLoggedIn) {
    return <Redirect to={'/login'}/>
  }

  return <>
    <Grid container className={classes.addItemFormGrid}>
      <AddItemForm addItem={addTodolist}/>
    </Grid>
    <Grid container spacing={3}>
      {todolists.map(tl => {
        let tasksForTodoList = tasks[tl.id];
        return <Grid item xs={12} sm={6} md={4} lg={3} key={tl.id}>
          <Paper elevation={3} className={classes.paper}>
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