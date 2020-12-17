import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from './components/Todolist/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {FilterType, todolistsActions, todolistsReducer} from './redux/todolists-reducer';
import {taskActions, tasksReducer} from './redux/tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from './api/tasks-api';


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducer() {
  const todoListID1 = v1();
  const todoListID2 = v1();

  let [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todoListID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', filter: 'all', order: 0, addedDate: ''}
  ]);

  const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todoListID1]:
      [
        {
          id: v1(), title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: todoListID1
        },
        {
          id: v1(), title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: todoListID1
        },
        {
          id: v1(), title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: todoListID1
        }
      ],
    [todoListID2]:
      [
        {
          id: v1(), title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: todoListID2
        },
        {
          id: v1(), title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: todoListID2
        },
        {
          id: v1(), title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: todoListID2
        }
      ]
  })


  function addTask(taskTitle: string, todoListId: string) {
    dispatchToTasksReducer(taskActions.addTaskAC(taskTitle, todoListId))
  }

  function removeTask(taskId: string, todoListId: string) {
    dispatchToTasksReducer(taskActions.removeTaskAC(taskId, todoListId))
  }

  function changeTaskStatus(taskId: string, status: TaskStatuses, todoListId: string) {
    dispatchToTasksReducer(taskActions.changeTaskStatusAC(taskId, status, todoListId))
  }

  function editTaskTitle(editedTitle: string, taskId: string, todolistId: string) {
    dispatchToTasksReducer(taskActions.changeTaskTitleAC(editedTitle, taskId, todolistId))
  }

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
              tasksForTodoList = tasks[tl.id].filter(task => task.status === TaskStatuses.New)
            }
            if (tl.filter === 'completed') {
              tasksForTodoList = tasks[tl.id].filter(task => task.status === TaskStatuses.Completed)
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

