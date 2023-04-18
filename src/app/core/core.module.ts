import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { authReducer } from './state/reducers/session.reducer'
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './state/effects/session.effects'

@NgModule({
  imports: [StoreModule.forFeature('session', authReducer), EffectsModule.forFeature([AuthEffects])],
})
export class CoreModule {}
