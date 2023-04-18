import { IProduct } from '@features/products/models/product.interface'
import { createAction, props } from '@ngrx/store'

export const loadProductsSuccess = createAction(
  '[Products API] Load products success',
  props<{ products: IProduct[] }>()
)

export const loadProductsFailure = createAction('[Products API] Load products fail')
