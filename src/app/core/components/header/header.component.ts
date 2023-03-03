import { Component, OnDestroy, OnInit } from '@angular/core'
import { ISession } from '@core/models/session.interface'
import { AuthService } from '@core/services/auth/auth.service'
import { SessionService } from '@core/services/session/session.service'
import { SidenavService } from '@core/services/sidenav/sidenav.service'
import { MenuItem } from 'primeng/api'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()

  items!: MenuItem[]

  constructor(
    private sidenavService: SidenavService,
    private sessionService: SessionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sessionService.session$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (session) => {
        this.createAvatarMenu()
      },
    })
  }

  createAvatarMenu(): void {
    this.items = [
      {
        label: this.sessionService.session.user.username,
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
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
