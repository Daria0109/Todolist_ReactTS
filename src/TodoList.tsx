import React, {useCallback} from 'react';
import {FilterType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './state/Task';

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

export const TodoList = React.memo((props: TodoListPropsType) => {
  console.log('TODOLIST')

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
    tasksForTodoList = props.tasks.filter(task => task.isDone === false)
  }
  if (props.filter === 'completed') {
    tasksForTodoList = props.tasks.filter(task => task.isDone === true)
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
          props.tasks.map(t => <Task key={t.id}
                                     isDone={t.isDone}
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

