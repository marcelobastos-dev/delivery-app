import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { authReducer } from './state/reducers/auth.reducer'
import { AuthEffects } from './state/effects/auth.effects'

@NgModule({
  imports: [StoreModule.forFeature('core', { session: authReducer }), EffectsModule.forFeature([AuthEffects])],
})
export class CoreModule {}
