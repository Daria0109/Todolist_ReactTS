import {TodolistDomainType, todolistsActions, todolistsReducer} from './todolists-reducer';
import {tasksReducer, TasksStateType} from './tasks-reducer';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState = [] as Array<TodolistDomainType>;

  const action = todolistsActions.addTodolistAC({
  id: 'todoListID1', title: 'What to learn', order: 0, addedDate: ''
  });

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe('todoListID1');
  expect(idFromTodolists).toBe('todoListID1');
});
