import {v1} from 'uuid';
import {TodolistDomainType, todolistsActions,todolistsReducer} from './todolists-reducer';

let initialState: Array<TodolistDomainType>;
let todoListID1: string;
let todoListID2: string;
beforeEach(() => {
  todoListID1 = v1();
  todoListID2 = v1();
  initialState = [
    {id: todoListID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', filter: 'all', order: 0, addedDate: ''}
  ]
})

test('correct todolist should be deleted', () => {
  let action = todolistsActions.removeTodolistAC(todoListID1);
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID2, title: 'What to bue', filter: 'all', order: 0, addedDate: ''}
  ])
})

test('correct todolist should be added', () => {
  let action = todolistsActions.addTodolistAC('How to live');
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', filter: 'all', order: 0, addedDate: ''},
    {id: action.todolistId, title: 'How to live', filter: 'all', order: 0, addedDate: ''},
  ])
})

test('todolist filter should be changed', () => {
  let action = todolistsActions.changeTodolistFilterAC('completed', todoListID2);
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', filter: 'completed', order: 0, addedDate: ''}
  ])
})

test('todolist title should be changed', () => {
  let action = todolistsActions.changeTodolistTitleAC('What to eat', todoListID2);
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to eat', filter: 'all', order: 0, addedDate: ''}
  ])
})