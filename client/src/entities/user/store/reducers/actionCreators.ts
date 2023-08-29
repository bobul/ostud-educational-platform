import {IValuesRegister} from "../../../../shared/models/IValuesRegister.ts";
import {IValuesLogin} from "../../../../shared/models/IValuesLogin.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import UserService from "../../service/UserService.ts";

export const fetchUserRegistration = createAsyncThunk(
    'user/register',
    async (values: IValuesRegister, thunkAPI) => {
        try {
            const response = await UserService.register(values)
            const {tokens, user} = response.data!.userRegister
            localStorage.setItem('token', tokens.accessToken);
            return user;
        } catch (e: any) {
            console.log(e.response?.errors?.message)
        }
    }
)

export const fetchUserLogin = createAsyncThunk(
    'user/login',
    async (values: IValuesLogin, thunkAPI) => {
        try {
            const response = await UserService.login(values);
            const {tokens, user} = response.data!.userRegister;
            localStorage.setItem('token', tokens.accessToken);
            return user;
        } catch (e: any) {
            console.log(e.response?.errors?.message);
        }
    }
)

export const userCheckAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.refresh();
            localStorage.setItem('token', response.data!.userRegister.tokens.accessToken);
        } catch (e: any) {
            console.log(e.response?.errors?.message);
        }
    }
)
