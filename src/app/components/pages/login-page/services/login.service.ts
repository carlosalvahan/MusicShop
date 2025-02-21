import { HttpClient, HttpContext } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { APIURL, sessionKeys } from "../../../../app.constants";
import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { BYPASS_LOG } from "../../../../app-interceptor";
import { StorageService } from "../../../shared/storage/storage-service";


@Injectable()
export class LoginService {
    status: WritableSignal<'loading' | 'loaded' | 'error' | 'idle'> = signal('idle');
    storageService = inject(StorageService);
    jwt = '';
    
    constructor(private httpService: HttpClient) {
        this.status.set('loading');
        const token = this.storageService.getItemFromSession<string>(sessionKeys.authToken);

        if (token) {
            this.jwt = token;
        }
        this.status.set('loaded');
    }

    userLogin(reqBody: any): Observable<any> {
        return this.httpService.post(APIURL.loginApi, reqBody, { context: new HttpContext().set(BYPASS_LOG, true) });
    }


    isLoggedIn(): boolean {
        return !!this.jwt;
    }
}