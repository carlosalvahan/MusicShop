import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { APIURL } from "../../../../app.constants";
import { Observable } from "rxjs";

@Injectable()
export class CartService {
    httpClient = inject(HttpClient);

    getCart(userId: string): Observable<CartDTO> {
        return this.httpClient.get<CartDTO>(APIURL.getCart.replace('${0}', userId));
    }

    updateCart(reqBody: any) {
        return this.httpClient.post(APIURL.restCartApi, reqBody);
    }

    removeItemFromCart(instrumentId: number) {
        return this.httpClient.delete(APIURL.removeFromCart.replace('${0}', instrumentId.toString()))
    }

    fulfillCart(reqBody: any) {
        return this.httpClient.post(APIURL.restOrderApi, reqBody);
    }

    getCartById(cartId: number) {
        return this.httpClient.get<CartDTO>(APIURL.restCartApi + '/' + cartId);
    }
}

interface CartDTO {
    id: number,
    items: any[],
    totalPrice: number
}