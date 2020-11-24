import {TodoListType} from '../App';
import {v1} from 'uuid';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from './todolists-reducer';

let initialState: Array<TodoListType>;
let todoListID1: string;
let todoListID2: string;
beforeEach(() => {
  todoListID1 = v1();
  todoListID2 = v1();
  initialState = [
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to bue', filter: 'all'}
  ]
})

test('correct todolist should be deleted', () => {
  let action = removeTodolistAC(todoListID1);
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID2, title: 'What to bue', filter: 'all'}
  ])
})

test('correct todolist should be added', () => {
  let action = addTodolistAC('How to live');
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to bue', filter: 'all'},
    {id: action.todolistId, title: 'How to live', filter: 'all'}
  ])
})

test('todolist filter should be changed', () => {
  let action = changeTodolistFilterAC('completed', todoListID2);
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to bue', filter: 'completed'}
  ])
})

test('todolist title should be changed', () => {
  let action = changeTodolistTitleAC('What to eat', todoListID2);
  let endState = todolistsReducer(initialState, action);

  expect(endState).toEqual([
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to eat', filter: 'all'}
  ])
})