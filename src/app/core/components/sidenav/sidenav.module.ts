import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { SidenavComponent } from './sidenav.component'

import { SidebarModule } from 'primeng/sidebar'

@NgModule({
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
  imports: [CommonModule, RouterModule, SidebarModule],
})
export class SidenavModule {}
