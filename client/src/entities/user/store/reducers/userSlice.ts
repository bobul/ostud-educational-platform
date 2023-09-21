import {IUser, UserRole} from "../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUserLogin, fetchUserRegistration, updateUser, userCheckAuth, userLogout} from "./actionCreators";

export interface UserState {
    user: IUser;
    isLoading?: boolean;
    isAuth: boolean;
    error: string;
}

const initialUser: IUser = {
    id: '',
    role: UserRole.student,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: undefined,
    rd: '',
    dob: '',
    activationLink: '',
    isActivate: false
}

const initialState: UserState = {
    user: initialUser,
    isLoading: false,
    isAuth: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserRegistration.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUserRegistration.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
            state.isAuth = true;
        },
        [fetchUserRegistration.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [fetchUserLogin.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUserLogin.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
            state.isAuth = true;
        },
        [fetchUserLogin.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [userCheckAuth.pending.type]: (state) => {
            state.isLoading = true;
        },
        [userCheckAuth.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
            state.isAuth = true;
        },
        [userCheckAuth.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [userLogout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [userLogout.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = '';
            state.user = {} as IUser;
            state.isAuth = false;
        },
        [userLogout.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [updateUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
            state.isAuth = true;
        },
        [updateUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default userSlice.reducer;