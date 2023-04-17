import { createSelector } from '@ngrx/store'
import { selectCoreFeatureState } from './core.selectors'

const selectSession = createSelector(selectCoreFeatureState, (state) => state.session)

export const selectCurrentSession = createSelector(selectSession, (state) => state.currentSession)

export const selectSessionError = createSelector(selectSession, (state) => state.error)
