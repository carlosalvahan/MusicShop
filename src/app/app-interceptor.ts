import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "./components/shared/storage/storage-service";
import { sessionKeys } from "./app.constants";
import { isPlatformBrowser } from "@angular/common";

export const BYPASS_LOG = new HttpContextToken(() => false);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let storageService = inject(StorageService);
    const platformId = inject(PLATFORM_ID);

    let clonedRequest = req;
    if (isPlatformBrowser(platformId)) {
        const token = storageService.getItemFromSession(sessionKeys.authToken);
        if (token) {
            clonedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}` 
                }
            });
        }
    }
    

    
    if (req.context.get(BYPASS_LOG)) {
        console.log('bypass logs please')
    } else {
        console.log('Called:', req.url);
    }
    return next(clonedRequest);
}