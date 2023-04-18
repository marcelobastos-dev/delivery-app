import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { IAuth } from '@core/models/auth.interface'
import { SessionService } from '@core/services/session/session.service'
import { SessionPageActions } from '@core/state/actions'
import { IAppState } from '@core/state/app.state'
import { selectCurrentSession } from '@core/state/selectors/session.selectors'
import { Store } from '@ngrx/store'
import { validateFormGroup } from '@shared/utils/validate-form-group'
import { Subject, takeUntil } from 'rxjs'

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
        .select(selectCurrentSession)
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
    this.store.dispatch(SessionPageActions.login({ auth }))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
