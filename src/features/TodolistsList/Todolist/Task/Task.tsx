import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses} from '../../../../api/tasks-api';
import {TaskDomainType} from '../tasks-reducer';

export type TaskPropsType = {
  task: TaskDomainType
  todolistId: string
  removeTask: (id: string, todoListId: string) => void
  changeTaskStatus: (status: TaskStatuses, taskId: string, todoListId: string) => void
  editTaskTitle: (editedTitle: string, taskId: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () => props.removeTask(props.task.id, props.todolistId);

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckedValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    props.changeTaskStatus(newCheckedValue, props.task.id, props.todolistId)
  };

  const editTaskTitle = useCallback((editedTitle: string) =>
      props.editTaskTitle(editedTitle, props.task.id, props.todolistId),
    [props.task.id, props.todolistId])

  return <div className={props.task.status ? 'is-done' : ''}>
    <Checkbox checked={props.task.status === TaskStatuses.Completed}
              disabled={props.task.entityStatus === 'loading'}
              onChange={changeStatus}/>
    <EditableSpan title={props.task.title}
                  editTitle={editTaskTitle}
                  notEdited={props.task.entityStatus === 'loading'}/>
    <IconButton onClick={onClickHandler} disabled={props.task.entityStatus === 'loading'}>
      <Delete/>
    </IconButton>
  </div>
})