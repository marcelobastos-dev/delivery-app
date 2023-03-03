import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { ProductsListComponent } from './products-list.component'

import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'

const routes: Routes = [{ path: '', component: ProductsListComponent }]

@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
  ],
})
export class ProductsListModule {}
