import {AppInitialStateType, setStatus, appReducer, setError, setIsAppInitialized} from './app-reducer';

let initialState: AppInitialStateType;

beforeEach(() => {
  initialState = {
    status: 'idle',
    error: null,
    isAppInitialized: false
  }
})

test('app status should be set', () => {
  const action = setStatus({status: 'loading'})
  const endState = appReducer(initialState, action)

  expect(endState.status).toBe('loading')
  expect(endState.error).toBe(null)
})
test('error should be set', () => {
  const action = setError({error: 'Error!'})
  const endState = appReducer(initialState, action)

  expect(endState.status).toBe('idle')
  expect(endState.error).toBe('Error!')
})
test('initialization status should be set to the state', () => {
  const action = setIsAppInitialized({isAppInitialised: true})
  const endState = appReducer(initialState, action)

  expect(endState.isAppInitialized).toBeTruthy()
})