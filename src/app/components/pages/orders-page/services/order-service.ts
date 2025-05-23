import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { APIURL } from "../../../../app.constants";
import { Observable } from "rxjs";
import { UserModel } from "../../../../store/user/user-model";

@Injectable()
export class OrderService {
    private httpClient = inject(HttpClient);

    getOrdersByUser(userId: string) {
        return this.httpClient.get(APIURL.getOrdersByUser.replace('${0}', userId));
    }

    getOrdersAdmin() {
        return this.httpClient.get(APIURL.restOrderApi)
    }

    getUserInfo(userId: string) {
        return this.httpClient.get(APIURL.restAuthApi + '/' + userId);
    }
}

