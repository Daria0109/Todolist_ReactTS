import {Dispatch} from 'redux';
import {authAPI} from '../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../helpers/error-helpers';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { setIsLoggedIn, setLogin } from '../features/Login/auth-reducer';

// S t a t e
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
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

// S l i c e
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
      state.status = action.payload.status
    },
    setError: (state, action: PayloadAction<{error: string | null}>) => {
      state.error = action.payload.error
    },
    setIsAppInitialized: (state, action: PayloadAction<{isAppInitialised: boolean}>) => {
      state.isAppInitialized = action.payload.isAppInitialised
    }
  }
})

// R e d u c e r
export const appReducer = appSlice.reducer;
export const {setError, setIsAppInitialized, setStatus} = appSlice.actions

// T h u n k
export const initializeApp = () => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authAPI.me()
      if (data.resultCode === 0) {
        dispatch(setIsLoggedIn({isLoggedIn: true}))
        dispatch(setLogin({login: data.data.login}))
      } else {
        if (data.messages.length !== 0) {
          handleServerAppError(data, dispatch)
        }
      }
      dispatch(setIsAppInitialized({isAppInitialised: true}))
    } catch(error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}
