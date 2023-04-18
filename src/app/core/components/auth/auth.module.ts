import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module'

import { AuthComponent } from './auth.component'

import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { StoreModule } from '@ngrx/store'
import { authReducer } from '@core/state/reducers/session.reducer'
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from '@core/state/effects/session.effects'

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, ButtonModule, CardModule, InputTextModule],
})
export class AuthModule {}
