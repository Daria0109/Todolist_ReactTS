import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/Todolist/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskPriorities, TaskStatuses, TaskType} from './api/tasks-api';
import {FilterType, TodolistDomainType} from './redux/todolists-reducer';


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  const todoListID1 = v1();
  const todoListID2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
    {id: todoListID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', filter: 'all', order: 0, addedDate: ''}
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
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
      ],
  })


  function addTask(taskTitle: string, todoListId: string) {
    const newTask: TaskType = {id: v1(), title: taskTitle, status: TaskStatuses.New,
      addedDate: '', deadline: '', description: '',order: 0, priority: TaskPriorities.High,
      startDate: '', todoListId};
    const todoListTasks = tasks[todoListId];
    tasks[todoListId] = [newTask, ...todoListTasks];
    setTasks({...tasks})
  }

  function removeTask(taskId: string, todoListId: string) {
    const todoListTasks = tasks[todoListId];
    tasks[todoListId] = todoListTasks.filter(t => t.id !== taskId);
    setTasks({...tasks})
  }

  function changeTaskStatus(taskId: string, status: TaskStatuses, todoListId: string) {
    const todoListTasks = tasks[todoListId];
    const task = todoListTasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      setTasks({...tasks})
    }
  }

  function editTaskTitle(editedTitle: string, taskId: string, todolistId: string) {
    let todoListTasks = tasks[todolistId];
    let newTasks = todoListTasks.map(task => {
      if (task.id === taskId) {
        return {...task, title: task.title = editedTitle}
      }
      return task
    })
    setTasks({...tasks, newTasks})
  }

  function changeFilter(value: FilterType, todoListId: string) {
    const todoList = todoLists.find(tl => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists])
    }
  }

  function removeTodoList(todoListId: string) {
    const filteredTodoLists = todoLists.filter(tl => tl.id !== todoListId);
    delete tasks[todoListId];
    setTodoLists(filteredTodoLists)
    setTasks({...tasks})
  }

  function addTodoList(title: string) {
    let todoListId = v1();
    let newTodoList: TodolistDomainType = {
      id: todoListId,
      title: title,
      filter: 'all',
      addedDate: '',
      order: 0
    };
    setTodoLists([newTodoList, ...todoLists]);
    setTasks({
      ...tasks,
      [todoListId]: []
    })
  }

  function editTodoListTitle(editedTitle: string, todoListId: string) {
    let newTodoLists = todoLists.map(tl => {
      if (tl.id === todoListId) {
        return {...tl, title: tl.title = editedTitle}
      }
      return tl
    })
    setTodoLists([...newTodoLists]);
    setTasks({...tasks})
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
        <Grid container style={{padding: '10px'}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map(tl => {
            let tasksForTodoList = tasks[tl.id];
            if (tl.filter === 'active') {
              tasksForTodoList = tasks[tl.id].filter(task => task.status === 0)
            }
            if (tl.filter === 'completed') {
              tasksForTodoList = tasks[tl.id].filter(task => task.status === 0)
            }
            return <Grid item>
              <Paper style={{padding: '20px', backgroundColor: 'powderblue'}}>
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

export default App;

