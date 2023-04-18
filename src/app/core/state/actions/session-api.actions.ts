import { ISession } from '@core/models/session.interface'
import { createAction, props } from '@ngrx/store'

export const loginSuccess = createAction('[Session API] Login sucess', props<{ session: ISession }>())

export const loginFailure = createAction('[Session API] Login failure', props<{ error: any }>())

export const logoutSuccess = createAction('[Session API] Logout success')
