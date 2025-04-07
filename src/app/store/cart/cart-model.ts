
export class CartListState {
    isLoading: boolean = true;
    cartList: CartItem[] = [];
    cartId: number = 0;
    totalPrice: number = 0;
    qtyGreaterStocks: boolean = false;
}

export class CartItem {
    id: number = 0;
    name: string = '';
    quantity: number = 0;
    price: number = 0;
    stocks: number = 0;
    instrumentId: number = 0;
    imageUrl: string = '';
}