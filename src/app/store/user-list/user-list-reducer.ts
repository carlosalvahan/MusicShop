import { createReducer, on } from "@ngrx/store";
import { UserListActions } from "./user-list-actions";
import { userListState } from "./user-list-model";

const initialState: userListState = {
    isLoading: true,
    userList: []
};

export const userListReducer = createReducer(
    initialState, 
    on(UserListActions.userLoading, (state, {loading}) => {
        return {
            ...state,
            isLoading: loading
        }
    }),
    on(UserListActions.getUserList, (state, {users}) => {
        return {
            ...state,
            isLoading: false,
            userList: [...users]
        }
    }),
    on(UserListActions.updateUser, (state, {user}) => {
        return {
            ...state,
            isLoading: false,
            userList: state.userList.map(sUser => {
                if(sUser.email === user.email) {
                    const newUser = {...sUser, ...user};
                    return newUser;
                }
                return sUser;
            })
        }
    }),
    on(UserListActions.deleteUser, (state, {id}) => {
        return {
            ...state,
            isLoading: false,
            userList: state.userList.filter(sUser => sUser.id !== id)
        }
    }),
)