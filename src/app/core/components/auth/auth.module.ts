import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module'

import { AuthComponent } from './auth.component'

import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, ButtonModule, CardModule, InputTextModule],
})
export class AuthModule {}
