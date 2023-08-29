import {IToken} from "./IToken.ts";
import {IUser} from "./IUser.ts";

export interface IAuthResponse {
    userRegister: {
        tokens: IToken;
        user: IUser;
    }
}