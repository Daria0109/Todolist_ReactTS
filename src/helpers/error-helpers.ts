import {APIResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import { setError, setStatus } from '../app/app-reducer';

export const handleServerAppError = <T>(data: APIResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setError({error: data.messages[0]}))
  } else {
    dispatch(setError({error: 'Some error occurred'}))
  }
  dispatch(setStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
  dispatch(setError({error: error.message ? error.message : 'Some error occurred'}))
  dispatch(setStatus({status: 'failed'}))
}