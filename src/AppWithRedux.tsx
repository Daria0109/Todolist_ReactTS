import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  FilterType,
  TodolistDomainType,
  todolistsActions,
  updateTodolistTC
} from './redux/todolists-reducer';
import {createTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from './redux/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './redux/store';
import {TaskStatuses} from './api/tasks-api';
import {Todolist} from './components/Todolist/TodoList';


function AppWithRedux() {
  console.log('APP')

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
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '10px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {todolists.map(tl => {
            let tasksForTodoList = tasks[tl.id];

            return <Grid item>
              <Paper style={{padding: '20px', backgroundColor: 'powderblue'}}>
                <Todolist key={tl.id}
                          title={tl.title}
                          id={tl.id}
                          tasks={tasksForTodoList}
                          removeTask={removeTask}
                          addTask={addTask}
                          changeFilter={changeFilter}
                          changeTaskStatus={changeTaskStatus}
                          filter={tl.filter}
                          removeTodoList={removeTodolist}
                          editTaskTitle={editTaskTitle}
                          editTodoListTitle={editTodoListTitle}
                />
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;

