import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '@environments/environment'
import { ISession } from '@core/models/session.interface'
import { IAuth } from '@core/models/auth.interface'
import { SessionService } from '../session/session.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private sessionService: SessionService) {}

  login(auth: IAuth): Observable<ISession> {
    return this.http.post<ISession>(`${environment.api.backend}/api/auth/local`, auth)
  }

  logout(): void {
    this.sessionService.clear()
    location.reload()
  }

  isAuthenticated(): boolean {
    let session: ISession | null = null

    try {
      session = JSON.parse(localStorage.getItem('session') || '')
    } catch {
      session = null
    }

    return session !== null
  }
}
