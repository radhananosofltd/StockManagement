import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionTimeoutModalComponent } from './components/session-timeout-modal/session-timeout-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SessionTimeoutModalComponent],
  template: `
    <router-outlet></router-outlet>
    <app-session-timeout-modal></app-session-timeout-modal>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
  `]
})
export class App {}
