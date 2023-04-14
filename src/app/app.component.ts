import { Component } from '@angular/core'
import { SessionService } from '@core/services/session/session.service'
import { PrimeNGConfig } from 'primeng/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  text: string = ''
  constructor(private primengConfig: PrimeNGConfig, private sessionService: SessionService) {}

  ngOnInit() {
    this.primengConfig.ripple = true
    this.sessionService.loadSession()
  }
}
