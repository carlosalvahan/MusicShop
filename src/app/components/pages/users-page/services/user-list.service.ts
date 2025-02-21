import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserModel } from "../../../../store/user/user-model";
import { Observable } from "rxjs";
import { APIURL } from "../../../../app.constants";

@Injectable()
export class UserListService {
    httpClient = inject(HttpClient);

    getAllUsers(): Observable<UserModel[]> {
        return this.httpClient.get<UserModel[]>(APIURL.getUsers);
    }

    deleteUser(id: string) {
        return this.httpClient.delete(APIURL.deleteUsers + id);
    }
}