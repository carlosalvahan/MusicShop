import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserListActions } from "./user-list-actions";
import { tap } from "rxjs";

@Injectable()
export class UserListEffects {
    actions$ = inject(Actions)
    updateList = createEffect(() => this.actions$.pipe(
        ofType(UserListActions.updateUser, UserListActions.deleteUser),
        tap((action) => {
            console.log(action);
        })
    ), {dispatch: false})
}