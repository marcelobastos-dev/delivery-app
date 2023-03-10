import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ViewsComponent } from './views.component'

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('@modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'products',
        loadChildren: () => import('@modules/products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('@modules/orders/orders.module').then((m) => m.OrdersModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
