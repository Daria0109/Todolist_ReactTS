import {Dispatch} from 'redux';
import {authAPI} from '../api/login-api';
import {authActions, AuthActionsType} from '../features/Login/auth-reducer';

export const appActions = {
  setStatusAC: (status: RequestStatusType) => ({
    type: 'todolist/app/SET-STATUS', status
  } as const),
  setErrorAC: (error: string | null) => ({
    type: 'todolist/app/SET-ERROR', error
  } as const),
  setIsAppInitialized: (isAppInitialised: boolean) => ({
    type: 'todolist/app/SET-IS-APP-INITIALIZED', isAppInitialised
  } as const)
}

type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
export type AppActionsType = ReturnType<ActionType<typeof appActions>>

const initialState: AppInitialStateType = {
  status: 'idle',
  error: null,
  isAppInitialized: false
}
export type AppInitialStateType = {
  status: RequestStatusType
  error: string | null
  isAppInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
  switch (action.type) {
    case 'todolist/app/SET-STATUS':
      return {
        ...state,
        status: action.status
      }
    case 'todolist/app/SET-ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'todolist/app/SET-IS-APP-INITIALIZED':
      return {
        ...state,
        isAppInitialized: action.isAppInitialised
      }
    default:
      return {...state}
  }
}
export default appReducer;

// T h u n k
export const initializeApp = () => {
  return async (dispatch: Dispatch<AppActionsType | AuthActionsType>) => {
    const data = await authAPI.me()
    if (data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn(true))
    } else {
      if (data.messages.length !== 0) {

      }
    }
    dispatch(appActions.setIsAppInitialized(true))
  }
}
