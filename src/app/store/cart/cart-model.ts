
export class CartListState {
    isLoading: boolean = true;
    cartList: CartItem[] = [];
}

export class CartItem {
    id: number = 0;
    name: string = '';
    quantity: number = 0;
    price: number = 0;
    stocks: number = 0;
}