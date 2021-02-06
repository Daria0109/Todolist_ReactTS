// A c t i o n s
import {Dispatch} from 'redux';
import {authAPI, LoginParamsType} from '../../api/auth-api';
import {appActions, AppActionsType, initializeApp} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../helpers/error-helpers';
import {ThunkAction} from 'redux-thunk';
import {AppRootStateType} from '../../app/store';

export const authActions = {
  setIsLoggedIn: (isLoggedIn: boolean) => ({
    type: 'todolist/login/SET-IS-LOGGED-IN', isLoggedIn} as const),
  setLogin: (login: string) => ({
    type: 'todolist/login/SET-LOGIN', login} as const)
}
type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
export type AuthActionsType = ReturnType<ActionType<typeof authActions>>


// S t a t e
const initialState = {
  isLoggedIn: false,
  login: null as string | null
}
export type AuthStateType = typeof initialState

// R e d u c e r
const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
  switch (action.type) {
    case 'todolist/login/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }
    case 'todolist/login/SET-LOGIN':
      return {
        ...state,
        login: action.login
      }
    default:
      return state
  }
}
export default authReducer;

// T h u n k
export const login = (loginData: LoginParamsType) => {
  return async (dispatch: Dispatch<AuthActionsType | AppActionsType | any>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data= await authAPI.login(loginData)
      if (data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn(true))
        dispatch(initializeApp())
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
  return async  (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setStatusAC('loading'))
      const data = await authAPI.logout()
      if (data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn(false))
        dispatch(appActions.setStatusAC('succeeded'))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch(error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}