import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { APIURL } from "../../../../app.constants";
import { Injectable } from "@angular/core";

@Injectable()
export class RegisterService {
    constructor(private httpService: HttpClient) {}

    userRegister(reqBody: any): Observable<any> {
        return this.httpService.post(APIURL.registerApi, reqBody);
    }

    getRoles() {
        return this.httpService.get(APIURL.getRolesApi);
    }
}