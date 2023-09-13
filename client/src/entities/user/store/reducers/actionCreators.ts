import {IValuesRegister} from "../../../../shared/models/IValuesRegister";
import {IValuesLogin} from "../../../../shared/models/IValuesLogin";
import {createAsyncThunk} from "@reduxjs/toolkit";
import UserService from "../../service/UserService";

export const fetchUserRegistration = createAsyncThunk(
    'profile/register',
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
    'profile/login',
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
    'profile/checkAuth',
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
    'profile/logout',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.logout();
            localStorage.removeItem('token');
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getUserById = createAsyncThunk(
    'otherUser/getUserById',
    async (id: string, thunkAPI) => {
        try {
            const response = await UserService.getUserById(id);
            return response.data?.getUserById
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)
