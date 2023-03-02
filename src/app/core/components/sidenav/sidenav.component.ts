import { Component, OnDestroy, OnInit } from '@angular/core'
import { SidenavService } from '@core/services/sidenav/sidenav.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  isOpen: boolean = false

  private readonly destroy$ = new Subject<void>()

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.isOpen$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (isOpen) => {
        this.isOpen = isOpen
      },
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
