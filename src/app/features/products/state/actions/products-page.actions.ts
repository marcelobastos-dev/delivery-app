import { createAction, props } from '@ngrx/store'

export const loadProducts = createAction('[Products Page] Load products', props<{ searchText: string }>())
