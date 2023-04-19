import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ViewsComponent } from './views.component'
import { ViewsRoutingModule } from './views-routing.module'
import { SidenavModule } from '@core/components/sidenav/sidenav.module'
import { HeaderModule } from '@core/components/header/header.module'

@NgModule({
  declarations: [ViewsComponent],
  imports: [CommonModule, ViewsRoutingModule, SidenavModule, HeaderModule],
})
export class ViewsModule {}
