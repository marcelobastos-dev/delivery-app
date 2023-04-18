import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { OrdersComponent } from './orders.component'

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/orders-list/orders-list.module').then((m) => m.OrdersListModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
