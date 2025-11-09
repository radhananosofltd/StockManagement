import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { SessionTimeoutInterceptor } from './interceptors/session-timeout.interceptor';
import { SessionTimeoutService } from './services/session-timeout.service';
import { SessionConfigService } from './config/session-config.service';
import { SessionConfigApiService } from './config/session-config-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionTimeoutInterceptor,
      multi: true
    },
    SessionTimeoutService,
    SessionConfigService,
    SessionConfigApiService
  ]
};
