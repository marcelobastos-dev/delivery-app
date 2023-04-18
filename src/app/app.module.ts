import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from '@core/core.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { environment } from '@environments/environment'

import { HttpErrorInterceptor } from '@core/interceptors/http-error/http-error.interceptor'
import { TokenInterceptor } from '@core/interceptors/token/token.interceptor'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ToastModule } from 'primeng/toast'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Delivery App DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    ConfirmPopupModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
