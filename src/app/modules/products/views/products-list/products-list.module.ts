import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { ProductsListComponent } from './products-list.component'
import { ProductFormComponent } from './components/product-form/product-form.component'

import { NoContentModule } from '@shared/components/no-content/no-content.module'

import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { DialogModule } from 'primeng/dialog'
import { InputNumberModule } from 'primeng/inputnumber'
import { TagModule } from 'primeng/tag'

const routes: Routes = [{ path: '', component: ProductsListComponent }]

@NgModule({
  declarations: [ProductsListComponent, ProductFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NoContentModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    InputNumberModule,
    TagModule,
  ],
})
export class ProductsListModule {}
