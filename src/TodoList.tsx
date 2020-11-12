import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todoListId: string) => void
  changeFilter: (value: FilterType, todoListId: string) => void
  addTask: (taskTitle: string, todoListId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  filter: FilterType
  removeTodoList: (todoListId: string) => void
  editTaskTitle: (editedTitle: string, taskId: string, todolistId: string) => void
  editTodoListTitle: (editedTitle: string, todoListId: string) => void
}

export function TodoList(props: TodoListPropsType) {

  const onAllClickHandler = () => props.changeFilter('all', props.id)
  const onActiveClickHandler = () => props.changeFilter('active', props.id)
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }

  const onAddTask = (title: string) => {
    props.addTask(title, props.id)
  }
  const editTodoListTitle = (editedTitle: string) => {
    props.editTodoListTitle(editedTitle, props.id)
  }


  return (
    <div>
      <h3>
        <EditableSpan title={props.title} editTitle={editTodoListTitle}/>
        <IconButton onClick={removeTodoList}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={onAddTask}/>
      <ul style={{padding: "0px"}}>
        {
          props.tasks.map(task => {
              debugger
              const onClickHandler = () => props.removeTask(task.id, props.id);
              const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
              const editTaskTitle = (editedTitle: string) =>
                props.editTaskTitle(editedTitle, task.id, props.id)
              return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Checkbox checked={task.isDone} onChange={changeStatus}/>
                <EditableSpan title={task.title} editTitle={editTaskTitle}/>
                <IconButton onClick={onClickHandler}>
                  <Delete/>
                </IconButton>
              </div>
            }
          )
        }

      </ul>
      <div>
        <Button variant={props.filter == 'all' ? 'contained' : 'text'}
                onClick={onAllClickHandler}>All
        </Button>
        <Button variant={props.filter == 'active' ? 'contained' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
        </Button>
        <Button variant={props.filter == 'completed' ? 'contained' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}>Completed
        </Button>
      </div>
    </div>
  )
}