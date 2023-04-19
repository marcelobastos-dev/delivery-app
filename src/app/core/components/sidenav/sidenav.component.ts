import { Component, OnDestroy, OnInit } from '@angular/core'
import { SidenavService } from '@core/services/sidenav/sidenav.service'
import { MenuItem } from 'primeng/api'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  isOpen: boolean = false
  menuItems: MenuItem[] = []

  private readonly destroy$ = new Subject<void>()

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.isOpen$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (isOpen) => {
        this.isOpen = isOpen
      },
    })

    this.setMenuItems()
  }

  setMenuItems(): void {
    this.menuItems = [
      {
        icon: 'home',
        label: 'Início',
        routerLink: '/view/dashboard',
      },
      {
        icon: 'lunch_dining',
        label: 'Produtos',
        routerLink: '/view/products',
      },
    ]
  }

  hideSidenav(): void {
    this.sidenavService.hide()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
