import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { MessageService } from 'primeng/api'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMsg = ''
        if (err.error instanceof ErrorEvent) {
          // Client side error
          errorMsg = err.error.message
        } else {
          // Server side error
          errorMsg = err.error.message
        }

        this.messageService.add({
          severity: 'error',
          detail: errorMsg,
          life: 8000,
        })

        return throwError(() => errorMsg)
      })
    )
  }
}
