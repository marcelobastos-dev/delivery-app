import { IProduct } from '@features/products/models/product.interface'
import { createReducer, on } from '@ngrx/store'
import { ProductsApiActions, ProductsPageActions } from '../actions'

export interface IProductsState {
  products: IProduct[]
  isLoadingProducts: boolean
}

const initialState: IProductsState = {
  products: [],
  isLoadingProducts: false,
}

export const productsReducer = createReducer<IProductsState>(
  initialState,
  on(ProductsPageActions.loadProducts, (state): IProductsState => {
    return {
      ...state,
      isLoadingProducts: true,
    }
  }),
  on(ProductsApiActions.loadProductsSuccess, (state, action): IProductsState => {
    return {
      ...state,
      products: action.products,
      isLoadingProducts: false,
    }
  }),
  on(ProductsApiActions.loadProductsFailure, (state): IProductsState => {
    return {
      ...state,
      products: [],
      isLoadingProducts: false,
    }
  })
)
