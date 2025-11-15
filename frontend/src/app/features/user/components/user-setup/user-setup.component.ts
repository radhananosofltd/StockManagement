import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent {
  isUserSetupPanelExpanded = signal(true);

  toggleUserSetupPanel() {
    this.isUserSetupPanelExpanded.update((value: boolean) => !value);
  }
}
