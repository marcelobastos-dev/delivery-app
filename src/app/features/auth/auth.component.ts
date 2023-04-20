import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { IAuth } from '@core/models/auth.interface'
import { AuthService } from '@core/services/auth/auth.service'
import { SessionService } from '@core/services/session/session.service'
import { isValidFormGroup } from '@core/utils/validate-form-group'
import { MessageService } from 'primeng/api'
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
    private message: MessageService,
    private authService: AuthService,
    private session: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildLoginForm()
  }

  buildLoginForm(): void {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  submit(): void {
    if (isValidFormGroup(this.loginForm)) {
      this.login()
    }
  }

  login(): void {
    const auth: IAuth = this.loginForm.value

    this.authService
      .login(auth)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.session.store(res)
          this.router.navigate(['/view/dashboard'])
        },
        error: (err) => {
          this.message.add({ severity: 'error', detail: 'Credenciais inválidas' })
        },
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
