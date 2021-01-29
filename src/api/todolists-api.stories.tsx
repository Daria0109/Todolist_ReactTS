import {Meta, Story} from '@storybook/react/types-6-0';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {todolistsAPI} from './todolists-api';


export default {
  title: 'API/Todolists',
} as Meta;


export const Get: Story = (args) => {
  const [state, setState] = useState<any>(null);
  const getTodos = () => {
    todolistsAPI.getTodolists()
      .then((res) => {
        setState(res)
      })
  }
  return <div>
    <button onClick={getTodos}>Get</button>
    <div>{JSON.stringify(state)}</div>
  </div>
}

export const Create: Story = (args) => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState('')
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const createTodo = (newTitle: string) => {
    todolistsAPI.createTodolist(newTitle)
      .then((res) => setState(res.data))
  }
  return <div>
    <input type="text" value={title} onChange={changeTitle}/>
    <button onClick={() => createTodo(title)}>Post</button>
    <div>{JSON.stringify(state)}</div>
  </div>
}

export const Delete: Story = (args) => {
  const [state, setState] = useState<any>(null);
  const [TodolistID, setTodolistID] = useState('');
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistID(e.currentTarget.value)
  }
  const deleteTodo = (id: string) => {
    todolistsAPI.deleteTodolist(id)
      .then((res) => setState(res.data))
  }
  return <div>
    <input type="text" value={TodolistID} onChange={onChangeHandler} placeholder='TodolistId'/>
    <button onClick={() => deleteTodo(TodolistID)}>Delete</button>
    <div>{JSON.stringify(state)}</div>
  </div>
}

export const Update: Story = (args) => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [todolistID, setTodolistID] = useState('');

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const changeId = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistID(e.currentTarget.value)
  }
  const updateTodo = (id: string, title: string) => {
    todolistsAPI.updateTodolist(id, title)
      .then((res) => setState(res.data))
  }
  return <div>
    <input type="text" value={title} onChange={changeTitle} placeholder='title...'/>
    <input type="text" value={todolistID} onChange={changeId} placeholder='todolistId...'/>
    <button onClick={() => updateTodo(todolistID, title)}>Update</button>
    <div>{JSON.stringify(state)}</div>
  </div>
}

