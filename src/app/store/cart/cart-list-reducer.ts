import { createReducer, on } from "@ngrx/store";
import { CartListState } from "./cart-model";
import { CartListAction } from "./cart-actions";

const initialState: CartListState = {
    isLoading: true,
    cartList: []
};

export const cartListReducer = createReducer(
    initialState,
    on(CartListAction.cartListLoading, (state, {loading}) => {
        return {
            ...state,
            isLoading: loading
        }
    }),

    on(CartListAction.getCartList, (state, {cartItems}) => {
        return {
            ...state,
            isLoading: false,
            cartList: [...cartItems]
        }
    }),

    on(CartListAction.updateCartItem, (state, {cartItem}) => {
        return {
            ...state,
            isLoading: false,
            cartList: state.cartList.map(sItem => {
                if(sItem.id === cartItem.id) {
                    const newUser = {...sItem, ...cartItem};
                    return newUser;
                }
                return sItem;
            })
        }
    }),

    on(CartListAction.deleteCartItem, (state, {id}) => {
        return {
            ...state,
            isLoading: false,
            cartList: state.cartList.filter(sItem => sItem.id !== id)
        }
    }),

    on(CartListAction.addCartItem, (state, {cartItem}) => {
        return {
            ...state,
            cartList: [...state.cartList, cartItem]
        }
    })
)