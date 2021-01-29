import React, {useCallback, useEffect} from 'react';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from '../Task/Task';
import {TaskStatuses, TaskType} from '../../api/tasks-api';
import {FilterType} from '../../redux/todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../../redux/tasks-reducer';

type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todoListId: string) => void
  changeFilter: (value: FilterType, todoListId: string) => void
  addTask: (taskTitle: string, todoListId: string) => void
  changeTaskStatus: (status: TaskStatuses, taskId: string, todoListId: string) => void
  filter: FilterType
  removeTodoList: (todoListId: string) => void
  editTaskTitle: (editedTitle: string, taskId: string, todolistId: string) => void
  editTodoListTitle: (editedTitle: string, todoListId: string) => void
}

export const Todolist = React.memo((props: TodoListPropsType) => {
  console.log('TODOLIST')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(props.id))
  }, [])

  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
  const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

  const removeTodoList = useCallback(() => {
    props.removeTodoList(props.id)
  }, [props.removeTodoList, props.id])

  const onAddTask = useCallback((title: string) => {
    props.addTask(title, props.id)
  }, [props.addTask, props.id])

  const editTodoListTitle = useCallback((editedTitle: string) => {
    props.editTodoListTitle(editedTitle, props.id)
  }, [props.editTodoListTitle, props.id])

  let tasksForTodoList = props.tasks;
  if (props.filter === 'active') {
    tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
  }
  if (props.filter === 'completed') {
    tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
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
      <ul style={{padding: '0px'}}>
        {
          tasksForTodoList.map(t => <Task key={t.id}
                                          status={t.status}
                                          title={t.title}
                                          taskId={t.id}
                                          todolistId={props.id}
                                          changeTaskStatus={props.changeTaskStatus}
                                          removeTask={props.removeTask}
                                          editTaskTitle={props.editTaskTitle}/>)}
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
})

