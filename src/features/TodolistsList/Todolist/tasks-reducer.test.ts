import {tasksReducer, TasksStateType, removeTask, addTask, changeTask, setTasks, changeEntityStatus} from './tasks-reducer';
import {TaskPriorities, TaskStatuses} from '../../../api/tasks-api';
import { addTodolist, removeTodolist, setTodolists } from './todolists-reducer';


let startState: TasksStateType;

beforeEach(() => {
  startState = {
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId2'
        }
      ]
  }
})

test('correct task should be deleted from correct array', () => {
  const action = removeTask({taskId: '2', todolistId: 'todolistId2'});

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId2'
        }
      ]
  })
});

test('correct task should be added to correct array', () => {
  const task = {
    id: '4',
    status: TaskStatuses.New,
    title: 'Chips',
    startDate: '',
    priority: TaskPriorities.Low,
    description: '',
    deadline: '',
    todoListId: 'todolistId2',
    order: 0,
    addedDate: ''
  }
  const action = addTask({todolistId: 'todolistId2', task: task});

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '4', status: TaskStatuses.New, title: 'Chips', startDate: '',
          priority: TaskPriorities.Low, description: '', deadline: '',
          todoListId: 'todolistId2', entityStatus: 'idle', order: 0, addedDate: ''
        },
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId2'
        }
      ]
  });
})

test('status of specified task should be changed', () => {
  const action = changeTask({todolistId: 'todolistId2', taskId: '2',
  model: {status: TaskStatuses.New}
});

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId2'
        }
      ]
  });
});

test('title of specified task should be changed', () => {
  const action = changeTask({todolistId: 'todolistId1', taskId: '2',
  model: {title: 'Bootstrap'}
});

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'Bootstrap', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId2'
        }
      ]
  });
});

test('new array should be added when new todolist is added', () => {
  const todolist = {id: 'todolistId3', title: 'What to learn', order: 0, addedDate: ''}
  const action = addTodolist({todolist});
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3);
  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId2'
        }
      ],
    'todolistId3': []
  })
});

test('property with todolistId should be deleted', () => {
  const action = removeTodolist({todolistId: 'todolistId2'});

  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState);
  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId1'
        }
      ]
  })
});

test('state for tasks should be created with todolists setting', () => {
  const todolists = [
    {id: 'todoListID1', title: 'What to learn', order: 0, addedDate: ''},
    {id: 'todoListID2', title: 'What to bue', order: 0, addedDate: ''}
  ]
  const action = setTodolists({todolists})
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
})

test('tasks should be set', () => {
  const tasks = [
    {
      id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
      order: 0, priority: TaskPriorities.High, startDate: '',
      status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
    },
    {
      id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
      order: 0, priority: TaskPriorities.High, startDate: '',
      status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
    },
    {
      id: '3', title: 'HTML', addedDate: '', deadline: '', description: '',
      order: 0, priority: TaskPriorities.High, startDate: '',
      status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId1'
    }
  ]
  const action = setTasks({todolistId: 'todolistId1', tasks})
  const endState: TasksStateType = tasksReducer({}, action)

  expect(endState['todolistId1']).toBeDefined()
  expect(endState['todolistId1'].length).toBe(3)
})

test ('an entity task status should be changed', () => {
  const action = changeEntityStatus({todolistId: 'todolistId2', taskId: '3', status: 'loading'})

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1':
      [
        {
          id: '1', title: 'HTML', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '2', title: 'CSS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId1'
        },
        {
          id: '3', title: 'JS', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'idle', todoListId: 'todolistId1'
        }
      ],
    'todolistId2':
      [
        {
          id: '1', title: 'Milk', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '2', title: 'Beer', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.Completed, entityStatus: 'idle', todoListId: 'todolistId2'
        },
        {
          id: '3', title: 'Fish', addedDate: '', deadline: '', description: '',
          order: 0, priority: TaskPriorities.High, startDate: '',
          status: TaskStatuses.New, entityStatus: 'loading', todoListId: 'todolistId2'
        }
      ]
  })
})
