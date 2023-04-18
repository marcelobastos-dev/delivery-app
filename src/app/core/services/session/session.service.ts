import { Injectable } from '@angular/core'
import { ISession } from '@core/models/session.interface'
import { SessionApiActions } from '@core/state/actions'
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
      this.setLocalSession(session)
      this.store.dispatch(SessionApiActions.loginSuccess({ session }))
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
    this.setLocalSession(session)
  }

  private setLocalSession(session: ISession): void {
    this.session = session
    this.authToken = session.jwt
  }

  clear(): void {
    localStorage.clear()
  }
}
