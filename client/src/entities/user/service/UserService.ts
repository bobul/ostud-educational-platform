import {IValuesRegister} from "../../../shared/models/IValuesRegister.ts";
import {
    IAuthResponseGetUserById,
    IAuthResponseLogin,
    IAuthResponseRefresh,
    IAuthResponseRegister
} from "../store/models/IAuthResponse.ts";
import {apolloClient} from "../../../app/providers/graphql";
import {USER_REGISTRATION} from "../../../features/session/registration";
import {FetchResult} from "@apollo/client";
import {USER_LOGIN} from "../../../features/session/login";
import {IValuesLogin} from "../../../shared/models/IValuesLogin.ts";
import {USER_REFRESH} from "../../../features/session/refresh";
import {USER_LOGOUT} from "../../../features/session/logout";
import {IUser} from "../store/models/IUser.ts";
import {GET_USER_BY_ID} from "../../../features/query/getUserById";

export default class UserService {
    static async register(values: IValuesRegister): Promise<FetchResult<IAuthResponseRegister>> {
        return apolloClient.mutate<IAuthResponseRegister>(
            {
                mutation: USER_REGISTRATION,
                variables: {
                    input: {
                        ...values
                    }
                }
            }
        )
    }

    static async login(values: IValuesLogin): Promise<FetchResult<IAuthResponseLogin>> {
        return apolloClient.mutate<IAuthResponseLogin>(
            {
                mutation: USER_LOGIN,
                variables: {
                    ...values
                }
            }
        )
    }

    static async refresh(): Promise<FetchResult<IAuthResponseRefresh>> {
        return apolloClient.mutate<IAuthResponseRefresh>(
            {
                mutation: USER_REFRESH,
            }
        )
    }

    static async logout(): Promise<FetchResult<void>> {
        return apolloClient.mutate<void>({
            mutation: USER_LOGOUT
        })
    }

    static async getUserById(id: string): Promise<FetchResult<IAuthResponseGetUserById>> {
        return apolloClient.query<IAuthResponseGetUserById>(
            {
                query: GET_USER_BY_ID,
            }
        )
    }

}