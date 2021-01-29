import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from '../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses} from '../../api/tasks-api';

export type TaskPropsType = {
  status: TaskStatuses
  title: string
  taskId: string
  todolistId: string
  removeTask: (id: string, todoListId: string) => void
  changeTaskStatus: (status: TaskStatuses, taskId: string, todoListId: string) => void
  editTaskTitle: (editedTitle: string, taskId: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () => props.removeTask(props.taskId, props.todolistId);

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckedValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    props.changeTaskStatus(newCheckedValue, props.taskId, props.todolistId)
  };

  const editTaskTitle = useCallback((editedTitle: string) =>
      props.editTaskTitle(editedTitle, props.taskId, props.todolistId),
    [props.taskId, props.todolistId])

  return <div className={props.status ? 'is-done' : ''}>
    <Checkbox checked={props.status === TaskStatuses.Completed} onChange={changeStatus}/>
    <EditableSpan title={props.title} editTitle={editTaskTitle}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>
})