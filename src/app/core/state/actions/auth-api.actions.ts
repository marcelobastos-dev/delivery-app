import { ISession } from '@core/models/session.interface'
import { createAction, props } from '@ngrx/store'

export const loginSuccess = createAction('[Auth API] Login sucess', props<{ session: ISession }>())

export const loginFailure = createAction('[Auth API] Login failure', props<{ error: any }>())

export const logoutSuccess = createAction('[Auth API] Logout success')
