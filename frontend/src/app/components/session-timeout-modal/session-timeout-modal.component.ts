import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SessionTimeoutService } from '../../services/session-timeout.service';

@Component({
  selector: 'app-session-timeout-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-timeout-modal.component.html',
  styleUrls: ['./session-timeout-modal.component.css']
})
export class SessionTimeoutModalComponent implements OnInit, OnDestroy {
  showWarningModal = false;
  showExpiredModal = false;
  
  private subscriptions: Subscription[] = [];

  constructor(private sessionTimeoutService: SessionTimeoutService) {
    console.log('SessionTimeoutModalComponent created');
  }

  ngOnInit(): void {
    // Subscribe to session warning
    this.subscriptions.push(
      this.sessionTimeoutService.sessionWarning$.subscribe(showWarning => {
        console.log('Modal: Session warning state changed:', showWarning);
        this.showWarningModal = showWarning;
      })
    );

    // Subscribe to session expired
    this.subscriptions.push(
      this.sessionTimeoutService.sessionExpired$.subscribe(expired => {
        console.log('Modal: Session expired state changed:', expired);
        this.showExpiredModal = expired;
        if (expired) {
          this.showWarningModal = false; // Hide warning if session expired
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Handle continuing session when warning is shown
   */
  continueSession(): void {
    this.sessionTimeoutService.dismissWarning();
    this.sessionTimeoutService.resetTimer();
  }

  /**
   * Handle session expiration acknowledgment
   */
  acknowledgeExpiration(): void {
    this.showExpiredModal = false;
    this.sessionTimeoutService.navigateToLogin();
  }
}