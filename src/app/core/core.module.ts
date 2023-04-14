import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { authReducer } from './components/auth/state/auth.reducer'
import { AuthEffects } from './components/auth/state/auth.effects'

@NgModule({
  imports: [StoreModule.forFeature('session', authReducer), EffectsModule.forFeature([AuthEffects])],
})
export class CoreModule {}
