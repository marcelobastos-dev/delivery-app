import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { OrdersListComponent } from './orders-list.component'

import { NgxMaskModule } from 'ngx-mask'

import { FieldsetModule } from 'primeng/fieldset'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'

const routes: Routes = [{ path: '', component: OrdersListComponent }]

@NgModule({
  declarations: [OrdersListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot(),
    FieldsetModule,
    CardModule,
    ButtonModule,
  ],
})
export class OrdersListModule {}
