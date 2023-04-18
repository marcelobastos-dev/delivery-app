import { Injectable } from '@angular/core'
import { AuthService } from '@core/services/auth/auth.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, exhaustMap, map, of } from 'rxjs'
import { SessionApiActions, SessionPageActions } from '@core/state/actions'

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private message: MessageService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SessionPageActions.login),
      exhaustMap((action) =>
        this.authService.login(action.auth).pipe(
          map((session) => SessionApiActions.loginSuccess({ session })),
          catchError((error) => {
            this.message.add({ severity: 'error', detail: 'Credenciais inválidas' })
            return of(SessionApiActions.loginFailure({ error }))
          })
        )
      )
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SessionPageActions.logout),
      exhaustMap(() => this.authService.logout().pipe(map(() => SessionApiActions.logoutSuccess())))
    )
  })
}
