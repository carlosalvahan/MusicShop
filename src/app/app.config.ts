import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/user/user-reducer';
import { userListReducer } from './store/user-list/user-list-reducer';
import { authInterceptor } from './app-interceptor';
import { LoginService } from './components/pages/login-page/services/login.service';
import { cartListReducer } from './store/cart/cart-list-reducer';
import { filterListReducer } from './store/filters/filter-reducer';
import { provideEffects } from '@ngrx/effects';
import { UserListEffects } from './store/user-list/user-list-effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideStore({
        user: userReducer,
        userList: userListReducer,
        cartList: cartListReducer,
        filters: filterListReducer
    }),
    LoginService,
    provideEffects([UserListEffects])
]
};
