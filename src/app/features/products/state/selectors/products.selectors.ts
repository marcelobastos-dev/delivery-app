import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IProductsState } from '../reducers/products.reducer'

const selectProductFeatureState = createFeatureSelector<IProductsState>('products')

export const selectProducts = createSelector(selectProductFeatureState, (state) => state.products)

export const selectIsLoadingProducts = createSelector(selectProductFeatureState, (state) => state.isLoadingProducts)
