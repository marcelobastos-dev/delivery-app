import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProductsRoutingModule } from './products-routing.module'

import { ProductsComponent } from './products.component'

import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { StoreModule } from '@ngrx/store'
import { productsReducer } from './state/reducers/products.reducer'
import { EffectsModule } from '@ngrx/effects'
import { ProductsEffects } from './state/effects/products.effects'

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
    ProductsRoutingModule,
    CardModule,
    InputTextModule,
  ],
})
export class ProductsModule {}
