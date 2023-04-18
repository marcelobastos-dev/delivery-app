import { Injectable } from '@angular/core'
import { ProductsService } from '@features/products/services/products/products.service'
import { createEffect, ofType } from '@ngrx/effects'
import { Actions } from '@ngrx/effects'
import { ProductsApiActions, ProductsPageActions } from '../actions'
import { catchError, map, of, switchMap } from 'rxjs'

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private productsService: ProductsService) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      switchMap(() =>
        this.productsService.find('', '', 1).pipe(
          map(({ data: products, meta }) => ProductsApiActions.loadProductsSuccess({ products })),
          catchError(() => of(ProductsApiActions.loadProductsFailure()))
        )
      )
    )
  })
}
