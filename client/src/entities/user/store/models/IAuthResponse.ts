import {IToken} from "./IToken.ts";
import {IUser} from "./IUser.ts";

export interface IAuthResponseRegister {
    userRegister: {
        tokens: IToken;
        user: IUser;
    }
}

export interface IAuthResponseLogin {
    userLogin: {
        tokens: IToken;
        user: IUser;
    }
}

export interface IAuthResponseRefresh {
    refresh: {
        tokens: IToken;
        user: IUser;
    }
}