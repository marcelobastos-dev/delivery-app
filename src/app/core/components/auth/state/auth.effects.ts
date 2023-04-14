import { Injectable } from '@angular/core'
import { AuthService } from '@core/services/auth/auth.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, exhaustMap, map, of } from 'rxjs'
import { AuthApiActions, AuthPageActions } from './actions'

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.login),
      exhaustMap((action) =>
        this.authService.login(action.auth).pipe(
          map((session) => AuthApiActions.loginSuccess({ session })),
          catchError((error) => {
            this.message.add({ severity: 'error', detail: 'Credenciais inválidas' })
            return of(AuthApiActions.loginFailure({ error }))
          })
        )
      )
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.logout),
      exhaustMap(() => this.authService.logout().pipe(map(() => AuthApiActions.logoutSuccess())))
    )
  })

  constructor(private actions$: Actions, private authService: AuthService, private message: MessageService) {}
}
