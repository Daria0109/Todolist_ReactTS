// A c t i o n s
import {Dispatch} from 'redux';
import {authAPI, LoginParamsType} from '../../api/login-api';
import {appActions, AppActionsType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../helpers/error-helpers';

export const loginActions = {
  setLogin: (isLoggedIn: boolean) => ({
    type: 'todolist/login/SET-IS-LOGGED-IN', isLoggedIn} as const)
}
type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
export type LoginActionsType = ReturnType<ActionType<typeof loginActions>>


// S t a t e
const initialState = {
  isLoggedIn: false
}
export type LoginInitialStateType = typeof initialState

// R e d u c e r
const loginReducer = (state: LoginInitialStateType = initialState, action: LoginActionsType): LoginInitialStateType => {
  switch (action.type) {
    case 'todolist/login/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }
    default:
      return state
  }
}
export default loginReducer;

// T h u n k
export const login = (loginData: LoginParamsType) => {
  return async (dispatch: Dispatch<LoginActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data= await authAPI.login(loginData)
      if (data.resultCode === 0) {
        dispatch(loginActions.setLogin(true))
        dispatch(appActions.setStatusAC('succeeded'))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch(error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}
export const logout = () => {
  return async  (dispatch: Dispatch<LoginActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data = await authAPI.logout()
      if (data.resultCode === 0) {
        dispatch(loginActions.setLogin(false))
        dispatch(appActions.setStatusAC('succeeded'))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch(error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}