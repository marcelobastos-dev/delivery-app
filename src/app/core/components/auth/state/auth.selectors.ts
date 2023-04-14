import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ISessionState } from './auth.reducer'

const getSessionFeatureState = createFeatureSelector<ISessionState>('session')

export const getSession = createSelector(getSessionFeatureState, (state) => state.currentSession)

export const getSessionError = createSelector(getSessionFeatureState, (state) => state.error)
