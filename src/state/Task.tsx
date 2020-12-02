import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from '../EditableSpan';
import {Delete} from '@material-ui/icons';

type TaskPropsType = {
  isDone: boolean
  title: string
  taskId: string
  todolistId: string
  removeTask: (id: string, todoListId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  editTaskTitle: (editedTitle: string, taskId: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () => props.removeTask(props.taskId, props.todolistId);

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
    props.changeTaskStatus(props.taskId, e.currentTarget.checked, props.todolistId);

  const editTaskTitle = useCallback((editedTitle: string) =>
      props.editTaskTitle(editedTitle, props.taskId, props.todolistId),
    [props.taskId, props.todolistId])

  return <div className={props.isDone ? 'is-done' : ''}>
    <Checkbox checked={props.isDone} onChange={changeStatus}/>
    <EditableSpan title={props.title} editTitle={editTaskTitle}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>
})