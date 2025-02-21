import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user-actions";
import { UserModel } from "./user-model";


const initialState: UserModel = {};

export const userReducer = createReducer(
    initialState, 
    on(UserActions.loggedIn, (state, {user}) => {
        return {...state, ...user}
    }),
    on(UserActions.loggedOut, () => {
        return {}
    })
)