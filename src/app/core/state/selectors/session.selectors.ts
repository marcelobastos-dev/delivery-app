import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ISessionState } from '../reducers/session.reducer'

const selectSessionFeatureState = createFeatureSelector<ISessionState>('session')

export const selectCurrentSession = createSelector(selectSessionFeatureState, (state) => state.currentSession)

export const selectSessionError = createSelector(selectSessionFeatureState, (state) => state.error)
