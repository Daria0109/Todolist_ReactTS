import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
};
export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {
  const todoListID1 = v1();
  const todoListID2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to bue', filter: 'all'}
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListID1]:
      [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false}
      ],
    [todoListID2]:
      [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Fish', isDone: false}
      ],
  })


  function addTask(taskTitle: string, todoListId: string) {
    const newTask = {id: v1(), title: taskTitle, isDone: false};
    const todoListTasks = tasks[todoListId];
    tasks[todoListId] = [newTask, ...todoListTasks];
    setTasks({...tasks})
  }

  function removeTask(taskId: string, todoListId: string) {
    const todoListTasks = tasks[todoListId];
    tasks[todoListId] = todoListTasks.filter(t => t.id !== taskId);
    setTasks({...tasks})
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
    const todoListTasks = tasks[todoListId];
    const task = todoListTasks.find(t => t.id = taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasks})
    }
  }

  function editTaskTitle(editedTitle: string, taskId: string, todolistId: string) {
    let todoListTasks = tasks[todolistId];
    let newTasks = todoListTasks.map(task => {
      if (task.id === taskId) {
        return {...task, title: task.title = editedTitle}
      }
      return task
    })
    setTasks({...tasks, newTasks})
  }

// let newTasks = tasks.map(task => {
  //     if (task.id == taskId) {
  //         return {...task, isDone: task.isDone = isDone}
  //     }
  //     return task
  // })


  function changeFilter(value: FilterType, todoListId: string) {
    const todoList = todoLists.find(tl => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists])
    }
  }

  function removeTodoList(todoListId: string) {
    const filteredTodoLists = todoLists.filter(tl => tl.id !== todoListId);
    delete tasks[todoListId];
    setTodoLists(filteredTodoLists)
    setTasks({...tasks})
  }

  function addTodoList(title: string) {
    let todoListId = v1();
    let newTodoList: TodoListType = {id: todoListId, title: title, filter: 'all'};
    setTodoLists([newTodoList, ...todoLists]);
    setTasks({
      ...tasks,
      [todoListId]: []
    })
  }

  function editTodoListTitle(editedTitle: string, todoListId: string) {
    let newTodoLists = todoLists.map(tl => {
      if (tl.id === todoListId) {
        return {...tl, title: tl.title = editedTitle}
      }
      return tl
    })
    setTodoLists([...newTodoLists]);
    setTasks({...tasks})
  }

  return (
    <div className="App">

      <AddItemForm addItem={addTodoList}/>

      {todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id];
        if (tl.filter === 'active') {
          tasksForTodoList = tasks[tl.id].filter(task => task.isDone === false)
        }
        if (tl.filter === 'completed') {
          tasksForTodoList = tasks[tl.id].filter(task => task.isDone === true)
        }
        return <TodoList key={tl.id}
                         title={tl.title}
                         id={tl.id}
                         tasks={tasksForTodoList}
                         removeTask={removeTask}
                         addTask={addTask}
                         changeFilter={changeFilter}
                         changeTaskStatus={changeTaskStatus}
                         filter={tl.filter}
                         removeTodoList={removeTodoList}
                         editTaskTitle={editTaskTitle}
                         editTodoListTitle={editTodoListTitle}/>
      })}
    </div>
  );
}

export default App;

