import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@core/guards/auth/auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./core/components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'view',
    loadChildren: () => import('./core/views/views.module').then((m) => m.ViewsModule),
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
