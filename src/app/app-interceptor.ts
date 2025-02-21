import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const BYPASS_LOG = new HttpContextToken(() => false);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    // const reqWithHeader = req.clone({
    //     headers: req.headers.set('X-New-Header', 'new header value'),
    //   });
    if(req.context.get(BYPASS_LOG)) {
        console.log('bypass logs please')
    } else {
        console.log('Called:', req.url);
    }
    return next(req);
  }