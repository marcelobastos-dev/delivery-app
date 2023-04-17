import { IAuth } from '@core/models/auth.interface'
import { createAction, props } from '@ngrx/store'

export const login = createAction('[Login Page] User login', props<{ auth: IAuth }>())

export const logout = createAction('[Logout Page] User logout')
