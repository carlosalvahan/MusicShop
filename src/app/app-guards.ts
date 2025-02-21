import { inject, Injector, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";
import { LoginService } from "./components/pages/login-page/services/login.service";
import { toObservable } from '@angular/core/rxjs-interop'
import { EMPTY, first, map, skipWhile, timeout } from "rxjs";
import { isPlatformServer } from "@angular/common";
import { Store } from "@ngrx/store";
import { ToastService } from "./components/shared/toast/toast-service";
import { StorageService } from "./components/shared/storage/storage-service";
import { sessionKeys } from "./app.constants";


export const loggedInGuard: CanActivateFn = (route) => {
    const loginService = inject(LoginService);
    const injector = inject(Injector);
    const platformId = inject(PLATFORM_ID);
    return toObservable(loginService.status, { injector }).pipe(
      skipWhile((status) => status === 'loading'),
      timeout({
        each: 5000,
        with: () => {
          console.error(
            'Auth guard stuck: status did not change from "loading" after 5 seconds.'
          );
          return EMPTY;
        },
      }),
      map(() => {
        if (isPlatformServer(platformId)) {
          return false;
        }
        if (loginService.isLoggedIn()) {
          return true;
        }
        return createUrlTreeFromSnapshot(route, ['/', 'login']);
      }),
      first()
    );
};


export const adminOnlyRoute: CanActivateFn = (route) => {
    // const platformId = inject(PLATFORM_ID);
    const toast = inject(ToastService);
    const loginService = inject(LoginService);
    const storageService = inject(StorageService);
    
    // return store.select('user').pipe(map(res => {
    //     if(res?.role?.toLowerCase() === 'admin') {
    //         return true;
    //     } else {
    //         // if (!isPlatformServer(platformId)) {
    //             // return false;
    //             toast.show({message: 'You are not allowed to access url: ' + route.url}, 'danger');
    //         //   }
            
    //         return createUrlTreeFromSnapshot(route, ['/', 'instruments']);
    //     }
    // }))
    if(loginService.isLoggedIn()) {
      const user = storageService.getItemFromSession<string>(sessionKeys.userPerm) || '';
      const isAdmin = JSON.parse(user)?.role?.toLowerCase() === 'admin';
      if(!isAdmin) {
        toast.show({message: 'You are not allowed to access url: ' + route.url}, 'danger');
      }
      return isAdmin;
    } else {
      return false;
    }
};

