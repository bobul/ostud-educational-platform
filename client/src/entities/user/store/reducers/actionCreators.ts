import {IValuesRegister} from "../../../../shared/models/IValuesRegister";
import {IValuesLogin} from "../../../../shared/models/IValuesLogin";
import {createAsyncThunk} from "@reduxjs/toolkit";
import UserService from "../../service/UserService";

export const fetchUserRegistration = createAsyncThunk(
    'user/register',
    async (values: IValuesRegister, thunkAPI) => {
        try {
            const response = await UserService.register(values);
            const {tokens, user} = response.data!.userRegister;
            localStorage.setItem('token', tokens.accessToken);
            return user;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const fetchUserLogin = createAsyncThunk(
    'user/login',
    async (values: IValuesLogin, thunkAPI) => {
        try {
            const response = await UserService.login(values);
            const {tokens, user} = response.data!.userLogin;
            localStorage.setItem('token', tokens.accessToken);
            return user;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const userCheckAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.refresh();
            const {tokens, user} = response.data!.refresh;
            localStorage.setItem('token', tokens.accessToken);
            return user;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const userLogout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.logout();
            localStorage.removeItem('token');
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)
