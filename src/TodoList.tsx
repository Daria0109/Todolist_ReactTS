import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={onAddTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                        debugger
                            const onClickHandler = () => props.removeTask(task.id, props.id);
                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
                                props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
                            const editTaskTitle = (editedTitle: string) =>
                                props.editTaskTitle(editedTitle, task.id, props.id)
                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone} onChange={changeStatus}/>
                                <EditableSpan title={task.title} editTitle={editTaskTitle}/>
                                <button onClick={(onClickHandler)}>x</button>
                            </li>
                        }
                    )
                }

            </ul>
            <div>
                <button className={props.filter == 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter == 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter == 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}