import authReducer, {authActions, AuthStateType} from './auth-reducer';

let startState: AuthStateType;

beforeEach(() => {
  startState = {
    isLoggedIn: false
  }
})

test('loggedIn status should be set to state', () => {
  const endState = authReducer(startState, authActions.setIsLoggedIn(true))

  expect(endState.isLoggedIn).toBeTruthy()
})
