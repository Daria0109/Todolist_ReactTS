import {v1} from 'uuid';
import {TodolistDomainType, todolistsReducer, removeTodolist, addTodolist, changeTodolistFilter, changeTodolistTitle, setTodolists, changeEntityStatus} from './todolists-reducer';

let initialState: Array<TodolistDomainType>;
let todoListID1: string;
let todoListID2: string;
beforeEach(() => {
  todoListID1 = v1();
  todoListID2 = v1();

  initialState = [
    {id: todoListID1, title: 'What to learn', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''}
  ]
})

test('correct todolist should be deleted', () => {
  let action = removeTodolist({todolistId: todoListID1});
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID2, title: 'What to bue', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''}
  ])
})

test('correct todolist should be added', () => {
  const todoListID3 = v1();
  const todolist = {id: todoListID3, title: 'How to live', order: 0, addedDate: ''}
  let action = addTodolist({todolist});
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID3, title: 'How to live', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
    {id: todoListID1, title: 'What to learn', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
  ])
})

test('todolist filter should be changed', () => {
  let action = changeTodolistFilter({filterValue: 'completed', todolistId: todoListID2});
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID1, title: 'What to learn', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', filter: 'completed', entityStatus: 'idle', order: 0, addedDate: ''}
  ])
})

test('todolist title should be changed', () => {
  let action = changeTodolistTitle({title: 'What to eat', todolistId: todoListID2});
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID1, title: 'What to learn', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to eat', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''}
  ])
})

test('todolists should be set correctly', () => {
  const todolists = [
    {id: todoListID1, title: 'What to learn', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', order: 0, addedDate: ''}
  ]
  const action = setTodolists({todolists})
  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
  expect(endState[0].filter).toBeDefined()
  expect(endState[1].filter).toBeDefined()
})

test('an entity todolist status should be changed', () => {
  const action = changeEntityStatus({todolistId: todoListID2, entityStatus: 'loading'})

  const endState = todolistsReducer(initialState, action)

  expect(endState).toEqual([
    {id: todoListID1, title: 'What to learn', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
    {id: todoListID2, title: 'What to bue', filter: 'all', entityStatus: 'loading', order: 0, addedDate: ''}
  ])
})