import {appActions, AppActionsType} from '../app/app-reducer';
import {APIResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export const handleServerAppError = <T>(data: APIResponseType<T>, dispatch: Dispatch<AppActionsType>) => {
  if (data.messages.length) {
    dispatch(appActions.setErrorAC(data.messages[0]))
  } else {
    dispatch(appActions.setErrorAC('Some error occurred'))
  }
  dispatch(appActions.setStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<AppActionsType>) => {
  dispatch(appActions.setErrorAC(error.message ? error.message : 'Some error occurred'))
  dispatch(appActions.setStatusAC('failed'))
}