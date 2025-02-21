import { UserModel } from "../user/user-model";

export class userListState {
    isLoading: boolean = true;
    userList: UserModel[] = [];
}