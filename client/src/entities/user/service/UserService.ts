import {IValuesRegister} from "../../../shared/models/IValuesRegister.ts";
import {IAuthResponse} from "../store/models/IAuthResponse.ts";
import {apolloClient} from "../../../app/providers/graphql";
import {USER_REGISTRATION} from "../../../features/session/registration";
import {FetchResult} from "@apollo/client";
import {USER_LOGIN} from "../../../features/session/login";
import {IValuesLogin} from "../../../shared/models/IValuesLogin.ts";

export default class UserService {
    static async register(values: IValuesRegister): Promise<FetchResult<IAuthResponse>> {
        return apolloClient.mutate<IAuthResponse>(
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

    static async login(values: IValuesLogin): Promise<FetchResult<IAuthResponse>> {
        return apolloClient.mutate<IAuthResponse>(
            {
                mutation: USER_LOGIN,
                variables: {
                    input: {
                        ...values
                    }
                }
            }
        )
    }

    static async refresh(): Promise<FetchResult<IAuthResponse>> {
        return apolloClient.mutate<IAuthResponse>(
            {
                mutation: USER_LOGIN,
            }
        )
    }

}