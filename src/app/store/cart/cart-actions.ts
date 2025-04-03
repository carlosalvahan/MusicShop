import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CartItem } from "./cart-model";

export const CartListAction = createActionGroup({
    source: 'UserList', 
    events: {
        'cartListLoading': props<{loading: boolean}>(),
        'getCartList': props<{cartId: number, cartItems: CartItem[]}>(),
        'addCartItem': props<{cartItem: CartItem}>(),
        'updateCartItem': props<{cartItem: CartItem}>(),
        'deleteCartItem': props<{id: number }>(),
    }
})