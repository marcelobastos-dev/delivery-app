import { Injectable } from '@angular/core'
import { AuthApiActions } from '@core/components/auth/state/actions'
import { getSession } from '@core/components/auth/state/auth.selectors'
import { ISession } from '@core/models/session.interface'
import { IAppState } from '@core/state/app.state'
import { Store } from '@ngrx/store'

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private authToken: string = ''
  private session!: ISession | null

  constructor(private store: Store<IAppState>) {}

  loadSession(): void {
    let session: ISession | null = null
    try {
      session = JSON.parse(localStorage.getItem('session') || '')
    } catch (e) {
      session = null
    }

    if (session) {
      this.session = session
      this.store.dispatch(AuthApiActions.loginSuccess({ session }))
    }
  }

  isAuthenticated(): boolean {
    return !!this.session
  }

  getToken(): string {
    return this.authToken
  }

  persist(session: ISession): void {
    localStorage.setItem('session', JSON.stringify(session))
    this.session = session
  }

  clear(): void {
    localStorage.clear()
  }
}
