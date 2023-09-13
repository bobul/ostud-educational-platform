import {IToken} from "./IToken";
import {IUser} from "./IUser";

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

export interface IAuthResponseGetUserById {
    getUserById: IUser;
}