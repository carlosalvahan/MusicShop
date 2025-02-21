import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserModel } from "../user/user-model";

export const UserListActions = createActionGroup({
    source: 'UserList', 
    events: {
        'userLoading': props<{loading: boolean}>(),
        'getUserList': props<{users: UserModel[]}>(),
        'updateUser': props<{user: UserModel}>(),
        'deleteUser': props<{id: string }>(),
    }
})