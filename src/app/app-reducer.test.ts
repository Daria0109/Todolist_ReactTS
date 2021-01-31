import appReducer, {appActions, AppInitialStateType} from './app-reducer';

let initialState: AppInitialStateType;

beforeEach(() => {
  initialState = {
    status: 'idle',
    error: null
  }
})

test('app status should be set', () => {
  const action = appActions.setStatusAC('loading')
  const endState = appReducer(initialState, action)

  expect(endState.status).toBe('loading')
  expect(endState.error).toBe(null)
})
test('error should be set', () => {
  const action = appActions.setErrorAC('Error!')
  const endState = appReducer(initialState, action)

  expect(endState.status).toBe('idle')
  expect(endState.error).toBe('Error!')
})