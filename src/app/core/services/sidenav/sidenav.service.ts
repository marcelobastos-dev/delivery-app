import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _isOpen = new BehaviorSubject<boolean>(false)
  isOpen$ = this._isOpen.asObservable()

  toggle(): void {
    this._isOpen.next(!this._isOpen.value)
  }

  show(): void {
    this._isOpen.next(true)
  }

  hide(): void {
    this._isOpen.next(false)
  }
}
