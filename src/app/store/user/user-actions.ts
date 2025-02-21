import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserModel } from "./user-model";

export const UserActions = createActionGroup({
    source: 'User', 
    events: {
        'loggedIn': props<{user: UserModel}>(),
        'loggedOut': emptyProps,
    }
})