import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductsComponent } from './products.component'

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/products-list/products-list.module').then((m) => m.ProductsListModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
