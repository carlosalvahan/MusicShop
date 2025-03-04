import { afterNextRender, inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToastService } from "./components/shared/toast/toast-service";
import { StorageService } from "./components/shared/storage/storage-service";
import { sessionKeys } from "./app.constants";
import { isPlatformBrowser } from "@angular/common";


export const loggedInGuard: CanActivateFn = (route) => {
  const toast = inject(ToastService);
  const storageService = inject(StorageService);
  afterNextRender(() => {
    if (!storageService.getItemFromSession(sessionKeys.authToken)) {
      toast.show({ message: 'You are not allowed to access url: ' + route.url }, 'danger');
    }
    return !!storageService.getItemFromSession(sessionKeys.authToken);
  });
  return false;
};


export const adminOnlyRoute: CanActivateFn = async(route) => {
  const toast = inject(ToastService);
  const storageService = inject(StorageService);
  const platformId = inject(PLATFORM_ID);
  if(isPlatformBrowser(platformId)){ 
    const user = storageService.getItemFromSession<string>(sessionKeys.userPerm) || '';
    if (user) {
      const isAdmin = JSON.parse(user)?.role?.toLowerCase() === 'admin';
      if (!isAdmin) {
        toast.show({ message: 'You are not allowed to access url: ' + route.url }, 'danger');
      }
      return isAdmin;
    } else {
      toast.show({ message: 'You must be logged in to access: ' + route.url }, 'danger');
      return false;
    }
  }
  return false;
};

