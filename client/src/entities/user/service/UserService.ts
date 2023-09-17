import {FetchResult} from "@apollo/client";
import {IValuesRegister, IValuesLogin} from "../../../shared";
import {IAuthResponseGetUserById, IAuthResponseLogin, IAuthResponseRefresh, IAuthResponseRegister} from "../store";
import {apolloClient} from "../../../app/providers";
import {USER_REGISTRATION, USER_LOGIN, USER_REFRESH, USER_LOGOUT, GET_USER_BY_ID} from "../../../features";

export class UserService {
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
                variables: {
                    id
                }
            }
        )
    }

}