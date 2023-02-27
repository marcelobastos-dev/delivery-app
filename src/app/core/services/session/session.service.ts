import { Injectable } from '@angular/core'
import { ISession } from '@core/models/session.interface'
import { ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private authToken: string = ''

  session$ = new ReplaySubject<ISession>(1)

  constructor() {
    this.loadSession()
  }

  loadSession(): void {
    let session: ISession | null = null
    try {
      session = JSON.parse(localStorage.getItem('session') || '')
    } catch (e) {
      session = null
    }

    if (session) {
      this.authToken = session.jwt
      this.session$.next(session)
    }
  }

  getToken(): string {
    return this.authToken
  }

  storeSession(session: ISession): void {
    localStorage.setItem('session', JSON.stringify(session))
    this.loadSession()
  }
}
