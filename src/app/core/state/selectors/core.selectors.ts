import { createFeatureSelector } from '@ngrx/store'
import { ICoreState } from '../app.state'

export const selectCoreFeatureState = createFeatureSelector<ICoreState>('core')
