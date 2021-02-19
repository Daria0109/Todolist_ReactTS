import {Dispatch} from 'redux';
import {authAPI, LoginParamsType} from '../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../helpers/error-helpers';
import { setStatus, initializeApp } from '../../app/app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// S t a t e
const initialState = {
  isLoggedIn: false,
  login: null as string | null
}

// S l i c e
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setLogin: (state, action: PayloadAction<{login: string}>) => {
      state.login = action.payload.login
    }
  }
})

// R e d u c e r
export const authReducer = authSlice.reducer;
export const {setIsLoggedIn, setLogin} = authSlice.actions


// T h u n k
export const login = (loginData: LoginParamsType) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setStatus({status: 'loading'}))
      const data= await authAPI.login(loginData)
      if (data.resultCode === 0) {
        dispatch(setIsLoggedIn({isLoggedIn: true}))
        dispatch(initializeApp())
        dispatch(setStatus({status: 'succeeded'}))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch(error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}
export const logout = () => {
  return async  (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({status: 'loading'}))
      const data = await authAPI.logout()
      if (data.resultCode === 0) {
        dispatch(setIsLoggedIn({isLoggedIn: false}))
        dispatch(setStatus({status: 'succeeded'}))
      } else {
        handleServerAppError(data, dispatch)
      }
    } catch(error) {
      handleServerNetworkError(error, dispatch)
    }
  }
}