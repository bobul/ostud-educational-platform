import {AppDispatch} from "../../../../app/store";
import {userSlice} from "./userSlice";
import {apolloClient} from "../../../../app/providers/graphql";
import {USER_REGISTRATION} from "../../../../features/session/registration";
import {IValuesRegister} from "../../../../shared/models/IValuesRegister.ts";
import jwtDecode from "jwt-decode";
import {IValuesLogin} from "../../../../shared/models/IValuesLogin.ts";
import {USER_LOGIN} from "../../../../features/session/login";
import {IUser} from "../models/IUser.ts";


export const fetchUserRegistration = (values: IValuesRegister) => async (dispatch: AppDispatch) => {

    try {
        dispatch(userSlice.actions.userFetchRegistrationPending)
        const response = await apolloClient.mutate(
            {
                mutation: USER_REGISTRATION,
                variables: {
                    input: {
                        ...values,
                        dob: values.dob.toISOString().slice(0, 10).split("-").reverse().join(".")
                    }
                }
            }
        )

        const {accessToken} = response.data.userRegister
        localStorage.setItem("accessToken", accessToken)

        const userData= jwtDecode<IUser>(accessToken)
        dispatch(userSlice.actions.userFetchRegistrationSuccess(userData))
    } catch (e) {
        dispatch(userSlice.actions.userFetchRegistrationError(e.message))
    }
}


export const fetchUserLogin = (values: IValuesLogin) => async (dispatch: AppDispatch) => {

    try {
        dispatch(userSlice.actions.userFetchLoginPending)
        const response = await apolloClient.mutate(
            {
                mutation: USER_LOGIN,
                variables: {
                    ...values
                }
            }
        )

        const {accessToken} = response.data.userLogin
        console.log(accessToken)
        localStorage.setItem("accessToken", accessToken)

        const userData = jwtDecode<IUser>(accessToken)
        dispatch(userSlice.actions.userFetchLoginSuccess(userData))
    } catch (e) {
        dispatch(userSlice.actions.userFetchLoginError(e.message))
    }
}