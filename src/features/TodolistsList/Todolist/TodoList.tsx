import React, {useCallback, useEffect} from 'react';
import AddItemForm from '../../../components/AddItemForm/AddItemForm';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/tasks-api';
import {FilterType, TodolistDomainType} from './todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC, TaskDomainType} from './tasks-reducer';
import s from './Todolist.module.css'

type TodoListPropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskDomainType>
  removeTask: (id: string, todoListId: string) => void
  changeFilter: (value: FilterType, todoListId: string) => void
  addTask: (taskTitle: string, todoListId: string) => void
  changeTaskStatus: (status: TaskStatuses, taskId: string, todoListId: string) => void
  removeTodoList: (todoListId: string) => void
  editTaskTitle: (editedTitle: string, taskId: string, todolistId: string) => void
  editTodoListTitle: (editedTitle: string, todoListId: string) => void
}

export const Todolist = React.memo((props: TodoListPropsType) => {
  console.log('TODOLIST')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(props.todolist.id))
  }, [])

  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id])
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id])
  const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id])

  const removeTodoList = useCallback(() => {
    props.removeTodoList(props.todolist.id)
  }, [props.removeTodoList, props.todolist.id])

  const onAddTask = useCallback((title: string) => {
    props.addTask(title, props.todolist.id)
  }, [props.addTask, props.todolist.id])

  const editTodoListTitle = useCallback((editedTitle: string) => {
    props.editTodoListTitle(editedTitle, props.todolist.id)
  }, [props.editTodoListTitle, props.todolist.id])

  let tasksForTodoList = props.tasks;
  if (props.todolist.filter === 'active') {
    tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
  }
  if (props.todolist.filter === 'completed') {
    tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
  }

  return <>
      <h3 className={s.title}>
        <EditableSpan title={props.todolist.title}
                      editTitle={editTodoListTitle}
                      notEdited={props.todolist.entityStatus === 'loading'}/>
        <IconButton onClick={removeTodoList} disabled={props.todolist.entityStatus === 'loading'}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={onAddTask} disabled={props.todolist.entityStatus === 'loading'}/>
      <ul className={s.tasks}>
        {
          tasksForTodoList.map(t => <Task key={t.id}
                                          task={t}
                                          todolistId={props.todolist.id}
                                          changeTaskStatus={props.changeTaskStatus}
                                          removeTask={props.removeTask}
                                          editTaskTitle={props.editTaskTitle}/>)}
      </ul>
      <div className={s.buttons}>
        <Button variant={props.todolist.filter == 'all' ? 'contained' : 'text'}
                onClick={onAllClickHandler}>All
        </Button>
        <Button variant={props.todolist.filter == 'active' ? 'contained' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
        </Button>
        <Button variant={props.todolist.filter == 'completed' ? 'contained' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}>Completed
        </Button>
      </div>
    </>
})

