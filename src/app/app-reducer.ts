export const appActions = {
  setStatusAC: (status: AppStatusType) => ({
    type: 'todolist/app/SET-STATUS', status
  } as const),
  setErrorAC: (error: string | null) => ({
    type: 'todolist/app/SET-ERROR', error
  }as const)
}

type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
export type AppActionsType = ReturnType<ActionType<typeof appActions>>

const initialState: AppInitialStateType = {
  status: 'idle',
  error: null
}
export type AppInitialStateType = {
  status: AppStatusType
  error: string | null
}
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


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
    default:
      return {...state}
  }
}
export default appReducer;