import { IProductsState } from '@features/products/state/reducers/products.reducer'
import { ISessionState } from './reducers/session.reducer'

export interface IAppState {
  session: ISessionState
  products: IProductsState
}
