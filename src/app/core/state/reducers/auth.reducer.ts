import { ISession } from '@core/models/session.interface'
import { createReducer, on } from '@ngrx/store'
import { AuthApiActions } from '@core/state/actions'

export interface ISessionState {
  currentSession: ISession | null
  error: any
}

const initialState: ISessionState = {
  currentSession: null,
  error: null,
}

export const authReducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, action): ISessionState => {
    return {
      ...state,
      currentSession: action.session,
      error: null,
    }
  }),
  on(AuthApiActions.loginFailure, (state, action): ISessionState => {
    return {
      ...state,
      currentSession: null,
      error: action.error,
    }
  })
)
