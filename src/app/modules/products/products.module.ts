import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProductsRoutingModule } from './products-routing.module'

import { ProductsComponent } from './products.component'

import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, CardModule, InputTextModule],
})
export class ProductsModule {}
