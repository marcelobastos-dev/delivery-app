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
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
