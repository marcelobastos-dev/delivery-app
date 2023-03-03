import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NoContentComponent } from './no-content.component'

@NgModule({
  declarations: [NoContentComponent],
  exports: [NoContentComponent],
  imports: [CommonModule],
})
export class NoContentModule {}
