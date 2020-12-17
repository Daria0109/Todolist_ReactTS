import {taskActions, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses} from '../api/tasks-api';


let startState: TasksStateType;

beforeEach(() => {
  startState = {
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId2'
        }
      ]
  }
})

test('correct task should be deleted from correct array', () => {
  const action = taskActions.removeTaskAC("2", "todolistId2");

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId2'
        }
      ]
  })
});

test('correct task should be added to correct array', () => {
  const action = taskActions.addTaskAC("juice", "todolistId2");

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: action.id, title: 'juice', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId2'
        },
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId2'
        }
      ]
  });
})

test('status of specified task should be changed', () => {
  const action = taskActions.changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId2'
        }
      ]
  });
});

test('title of specified task should be changed', () => {
  const action = taskActions.changeTaskTitleAC("HTML", '3', "todolistId1");

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId2'
        }
      ]
  });
});

test('new array should be added when new todolist is added', () => {
  const action = taskActions.addTodolistAC("new todolist");
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId2'
        }
      ],
    [action.todolistId]: []
  })
});

test('property with todolistId should be deleted', () => {
  const action = taskActions.removeTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState);
  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, todoListId: 'todolistId1'
        }
      ]
  })
});
