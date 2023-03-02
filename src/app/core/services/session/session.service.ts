import { Injectable } from '@angular/core'
import { ISession } from '@core/models/session.interface'
import { BehaviorSubject, ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private authToken: string = ''

  private _session = new BehaviorSubject<ISession>({} as ISession)
  session$ = this._session.asObservable()

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
      this.session = session
    }
  }

  get session(): ISession {
    return this._session.getValue()
  }

  set session(session: ISession) {
    this.authToken = session.jwt
    this._session.next(session)
  }

  getToken(): string {
    return this.authToken
  }

  store(session: ISession): void {
    localStorage.setItem('session', JSON.stringify(session))
    this.loadSession()
  }

  clear(): void {
    localStorage.clear()
  }
}
