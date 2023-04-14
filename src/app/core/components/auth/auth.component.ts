import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { IAuth } from '@core/models/auth.interface'
import { SessionService } from '@core/services/session/session.service'
import { IAppState } from '@core/state/app.state'
import { validateFormGroup } from '@core/utils/validate-form-group'
import { Store } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'
import { AuthPageActions } from './state/actions'
import { getSession } from './state/auth.selectors'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  private readonly destroy$ = new Subject<void>()

  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildLoginForm()

    if (!this.sessionService.isAuthenticated()) {
      this.store
        .select(getSession)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (session) => {
            if (session) {
              this.sessionService.persist(session)
              this.router.navigate(['/view/dashboard'])
            }
          },
        })
    } else {
      this.router.navigate(['/view/dashboard'])
    }
  }

  buildLoginForm(): void {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  submit(): void {
    if (validateFormGroup(this.loginForm)) {
      this.login()
    }
  }

  login(): void {
    const auth: IAuth = this.loginForm.value
    this.store.dispatch(AuthPageActions.login({ auth }))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
