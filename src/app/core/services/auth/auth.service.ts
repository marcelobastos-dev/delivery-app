import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IAuth } from '@core/models/auth.interface'
import { ISession } from '@core/models/session.interface'
import { environment } from '@environments/environment'
import { Observable } from 'rxjs'
import { SessionService } from '../session/session.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private session$!: Observable<ISession | null>

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  login(auth: IAuth): Observable<ISession> {
    return this.http.post<ISession>(`${environment.api.backend}/api/auth/local`, auth)
  }

  logout(): Observable<null> {
    return new Observable((observer) => {
      this.sessionService.clear()
      location.reload()
      observer.next()
      observer.complete()
    })
  }
}
