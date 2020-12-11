import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from './components/Todolist/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {todolistsActions, todolistsReducer} from './redux/todolists-reducer';
import {taskActions, tasksReducer} from './redux/tasks-reducer';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
};
export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducer() {
  const todoListID1 = v1();
  const todoListID2 = v1();

  let [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to bue', filter: 'all'}
  ]);

  const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todoListID1]:
      [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false}
      ],
    [todoListID2]:
      [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Fish', isDone: false}
      ],
  })


  function addTask(taskTitle: string, todoListId: string) {
    dispatchToTasksReducer(taskActions.addTaskAC(taskTitle, todoListId))
  }

  function removeTask(taskId: string, todoListId: string) {
    dispatchToTasksReducer(taskActions.removeTaskAC(taskId, todoListId))
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
    dispatchToTasksReducer(taskActions.changeTaskStatusAC(taskId, isDone, todoListId))
  }

  function editTaskTitle(editedTitle: string, taskId: string, todolistId: string) {
    dispatchToTasksReducer(taskActions.changeTaskTitleAC(editedTitle, taskId, todolistId))
  }

// let newTasks = tasks.map(task => {
  //     if (task.id == taskId) {
  //         return {...task, isDone: task.isDone = isDone}
  //     }
  //     return task
  // })


  function changeFilter(value: FilterType, todoListId: string) {
    dispatchToTodolistsReducer(todolistsActions.changeTodolistFilterAC(value, todoListId))
  }

  function removeTodoList(todoListId: string) {
    dispatchToTodolistsReducer(todolistsActions.removeTodolistAC(todoListId));
    dispatchToTasksReducer(todolistsActions.removeTodolistAC(todoListId))
  }

  function addTodoList(title: string) {
    let action = todolistsActions.addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action)
  }

  function editTodoListTitle(editedTitle: string, todoListId: string) {
    let action = todolistsActions.changeTodolistTitleAC(editedTitle, todoListId);
    dispatchToTodolistsReducer(action);
  }
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
        <Grid container style={{padding: "10px"}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map(tl => {
            let tasksForTodoList = tasks[tl.id];
            if (tl.filter === 'active') {
              tasksForTodoList = tasks[tl.id].filter(task => task.isDone === false)
            }
            if (tl.filter === 'completed') {
              tasksForTodoList = tasks[tl.id].filter(task => task.isDone === true)
            }
            return <Grid item>
              <Paper style={{padding: "20px", backgroundColor: "powderblue"}}>
                <TodoList key={tl.id}
                          title={tl.title}
                          id={tl.id}
                          tasks={tasksForTodoList}
                          removeTask={removeTask}
                          addTask={addTask}
                          changeFilter={changeFilter}
                          changeTaskStatus={changeTaskStatus}
                          filter={tl.filter}
                          removeTodoList={removeTodoList}
                          editTaskTitle={editTaskTitle}
                          editTodoListTitle={editTodoListTitle}/>
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;

