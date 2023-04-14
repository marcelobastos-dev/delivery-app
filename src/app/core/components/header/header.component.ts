import { Component, OnDestroy, OnInit } from '@angular/core'
import { ISession } from '@core/models/session.interface'
import { AuthService } from '@core/services/auth/auth.service'
import { SessionService } from '@core/services/session/session.service'
import { SidenavService } from '@core/services/sidenav/sidenav.service'
import { IAppState } from '@core/state/app.state'
import { Store } from '@ngrx/store'
import { MenuItem } from 'primeng/api'
import { Observable, Subject, takeUntil } from 'rxjs'
import { getSession } from '../auth/state/auth.selectors'
import { AuthPageActions } from '../auth/state/actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  session!: ISession | null

  items!: MenuItem[]

  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select(getSession)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (session) => {
          this.session = session
          this.createAvatarMenu()
        },
      })
  }

  createAvatarMenu(): void {
    this.items = [
      {
        label: this.session?.user.username,
        items: [
          {
            label: 'Meu perfil',
            icon: 'pi pi-user',
            routerLink: '/view/profile',
          },
          {
            separator: true,
          },
          {
            label: 'Sair',
            icon: 'pi pi-power-off',
            command: () => {
              this.logout()
            },
          },
        ],
      },
    ]
  }

  showSidenav(): void {
    this.sidenavService.show()
  }

  logout(): void {
    this.store.dispatch(AuthPageActions.logout())
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
