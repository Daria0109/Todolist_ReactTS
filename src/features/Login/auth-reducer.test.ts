import {AuthStateType, authReducer, setIsLoggedIn, setLogin} from './auth-reducer';

let startState: AuthStateType;

beforeEach(() => {
  startState = {
    isLoggedIn: false,
    login: null
  }
})

test('loggedIn status should be set to the state', () => {
  const endState = authReducer(startState, setIsLoggedIn({isLoggedIn: true}))
  expect(endState.isLoggedIn).toBeTruthy()
})

test('login should be set to the state', () => {
  const endState = authReducer(startState, setLogin({login: 'someuser@email.com'}))
  expect(endState.login).toBe('someuser@email.com')
})
