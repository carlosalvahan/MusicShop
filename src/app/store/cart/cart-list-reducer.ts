import { createReducer, on } from "@ngrx/store";
import { CartItem, CartListState } from "./cart-model";
import { CartListAction } from "./cart-actions";

const initialState: CartListState = {
    isLoading: true,
    cartList: [],
    cartId: 0,
    totalPrice: 0,
    qtyGreaterStocks: false
};

export const cartListReducer = createReducer(
    initialState,
    on(CartListAction.cartListLoading, (state, {loading}) => {
        return {
            ...state,
            isLoading: loading
        }
    }),

    on(CartListAction.getCartList, (state, {cartId, cartItems}) => {
        return {
            ...state,
            isLoading: false,
            cartId,
            cartList: [...cartItems],
            totalPrice: calculateTotal([...cartItems]),
            qtyGreaterStocks: checkQuantity([...cartItems])
        }
    }),

    on(CartListAction.updateCartItem, (state, {cartItem}) => {
        const newCartList = state.cartList.map(sItem => {
            if(sItem.id === cartItem.id) {
                const newUser = {...sItem, ...cartItem};
                return newUser;
            }
            return sItem;
        });
        return {
            ...state,
            isLoading: false,
            cartList: newCartList,
            totalPrice: calculateTotal(newCartList),
            qtyGreaterStocks: checkQuantity(newCartList)
        }
    }),

    on(CartListAction.deleteCartItem, (state, {id}) => {
        const newCartList = state.cartList.filter(sItem => sItem.id !== id);
        return {
            ...state,
            isLoading: false,
            cartList: newCartList,
            totalPrice: calculateTotal(newCartList),
            qtyGreaterStocks: checkQuantity(newCartList)
        }
    }),

    on(CartListAction.addCartItem, (state, {cartItem}) => {
        const newCartList = [...state.cartList, cartItem];
        return {
            ...state,
            cartList: newCartList,
            totalPrice: calculateTotal(newCartList),
            qtyGreaterStocks: checkQuantity(newCartList)
        }
    })
)

function calculateTotal(item: CartItem[]) {
    return item.reduce((acc: number, curr: CartItem) => {
        return acc + (curr.price * curr.quantity)
    }, 0)
}

function checkQuantity(item: CartItem[]) {
    let returnVal = false;
    item.forEach(i => {
        if(i.quantity > i.stocks) {
            returnVal = true;
        }
    });
    return returnVal;
}