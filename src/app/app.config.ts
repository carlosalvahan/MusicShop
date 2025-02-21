import { ApplicationConfig, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/user/user-reducer';
import { userListReducer } from './store/user-list/user-list-reducer';
import { authInterceptor } from './app-interceptor';
import { LOCAL_STORAGE } from './components/shared/tokens/token';
import { isPlatformServer } from '@angular/common';
import { LoginService } from './components/pages/login-page/services/login.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withHashLocation()
    ),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]),
    ),
    provideStore({
      user: userReducer,
      userList: userListReducer
    }),
    {
      provide: LOCAL_STORAGE,
      useFactory: (platformId: object) => {
        if (isPlatformServer(platformId)) {
          return {}; // Return an empty object on the server
        }
        return sessionStorage; // Use the browser's localStorage
      },
      deps: [PLATFORM_ID],
    },
    LoginService
  ]
};
