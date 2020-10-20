import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, TaskType} from './App';

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
}

export function TodoList(props: TodoListPropsType) {
    let [newTaskText, setNewTaskText] = useState('');
    let [error, setError] = useState<string | null>(null)

    const onAddTaskHandler = () => {
        if (newTaskText.trim()) {
            props.addTask(newTaskText, props.id);
            setNewTaskText('');
        } else {
            setError('Text is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTaskText(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        if (e.key === 'Enter') {
            onAddTaskHandler()
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={() => props.removeTodoList(props.id)}>x</button>
            </h3>
            <div>
                <input value={newTaskText}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={onAddTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                            const onClickHandler = () => props.removeTask(task.id, props.id);
                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
                                props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                            return <li key={task.id}>
                                <input type="checkbox"
                                       checked={task.isDone} onChange={changeStatus}/>
                                <span className={task.isDone ? 'is-done' : ''}>{task.title}</span>
                                <button onClick={onClickHandler}>x</button>
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