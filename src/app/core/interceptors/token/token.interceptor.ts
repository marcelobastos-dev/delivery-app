import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SessionService } from '@core/services/session/session.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('auth/local')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.sessionService.getToken()}`,
        },
      })
    }

    return next.handle(request)
  }
}
