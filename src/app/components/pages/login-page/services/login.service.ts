import { HttpClient, HttpContext } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { APIURL, sessionKeys } from "../../../../app.constants";
import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { BYPASS_LOG } from "../../../../app-interceptor";


@Injectable()
export class LoginService {
    
    httpService = inject(HttpClient);

    userLogin(reqBody: any): Observable<any> {
        return this.httpService.post(APIURL.loginApi, reqBody, { context: new HttpContext().set(BYPASS_LOG, true) });
    }

}