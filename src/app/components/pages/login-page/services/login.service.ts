import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { APIURL } from "../../../../app.constants";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {
    constructor(private httpService: HttpClient) {}

    userLogin(reqBody: any): Observable<any> {
        return this.httpService.post(APIURL.loginApi, reqBody);
    }
}