import {Meta, Story} from '@storybook/react/types-6-0';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {tasksAPI} from './tasks-api';


export default {
  title: 'API/Tasks',
} as Meta;

// G E T
export const Get: Story = (args) => {
  const [state, setState] = useState<any>(null);
  const [todolistID, setTodolistID] = useState('')

  const changeTodoID = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistID(e.currentTarget.value)
  }
  const getTasks = (id: string) => {
    tasksAPI.getTasks(id)
      .then((res) => {
        setState(res.items)
        console.log(res.items)
      })
  }
  return <div>
    <input type="text" placeholder='todolistID...' value={todolistID} onChange={changeTodoID}/>
    <button onClick={() => getTasks(todolistID)}>Get</button>
    <div>{JSON.stringify(state)}</div>
  </div>
}

// P O S T
export const Create: Story = (args) => {
  const [state, setState] = useState<any>(null);
  const [todolistID, setTodolistID] = useState('');
  const [taskTitle, setTaskTitle] = useState('')

  const changeTodoID = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistID(e.currentTarget.value)
  }
  const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const createTasks = (id: string, title: string) => {
    tasksAPI.createTask(id, title)
      .then((res) => {
          console.log(res)
        setState(res.data)
        })
  }
  return <div>
    <input type="text" placeholder='todolistID...' value={todolistID} onChange={changeTodoID}/>
    <input type="text" placeholder='taskTitle' value={taskTitle} onChange={changeTaskTitle}/>
    <button onClick={() => createTasks(todolistID, taskTitle)}>Post</button>
    <div>{JSON.stringify(state)}</div>
  </div>
}

// D E L E T E
export const Delete: Story = (args) => {
  const [state, setState] = useState<any>(null);
  const [todolistID, setTodolistID] = useState('');
  const [taskID, setTaskID] = useState('')

  const changeTodoID = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistID(e.currentTarget.value)
  }
  const changeTaskID = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskID(e.currentTarget.value)
  }
  const deleteTask = (todoID: string, taskID: string) => {
    tasksAPI.deleteTask(todoID, taskID)
      .then((res) => setState(res.data))
  }
  return <div>
    <input type="text" placeholder='todolistID...' value={todolistID} onChange={changeTodoID}/>
    <input type="text" placeholder='taskID...' value={taskID} onChange={changeTaskID}/>
    <button onClick={() => deleteTask(todolistID, taskID)}>Delete</button>
    <div>{JSON.stringify(state)}</div>
  </div>
}

// P U T
export const Update: Story = (args) => {
  const [state, setState] = useState<any>(null);
  const [todolistID, setTodolistID] = useState('');
  const [taskID, setTaskID] = useState('');
  const [taskTitle, setTaskTitle] = useState('')

  const changeTodoID = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistID(e.currentTarget.value)
  }
  const changeTaskID = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskID(e.currentTarget.value)
  }
  const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const updateTask = (todoID: string, taskID: string, newTaskTitle: string) => {
    tasksAPI.updateTask(todoID, taskID, {
      title: taskTitle,
      status: 0,
      startDate: '',
      priority: 1,
      description: '',
      deadline: '',
    })
      .then((res) => {
        console.log(res.data)
        setState(res.data.item)
      })
  }
  return <div>
    <input type="text" placeholder='todolistID...' value={todolistID} onChange={changeTodoID}/>
    <input type="text" placeholder='taskID...' value={taskID} onChange={changeTaskID}/>
    <input type="text" placeholder='title...' value={taskTitle} onChange={changeTaskTitle}/>
    <button onClick={() => updateTask(todolistID, taskID, taskTitle)}>Put</button>
    <div>{JSON.stringify(state)}</div>
  </div>
}
