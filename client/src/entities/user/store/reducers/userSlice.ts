import {IUser, UserRole} from "../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user: IUser;
    isLoading: boolean;
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
    image: null,
    rd: '',
    dob: ''
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
    reducers: {
        userFetchRegistrationPending(state) {
            state.isLoading = true;
        },
        userFetchRegistrationSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
            state.isAuth = true;
        },
        userFetchRegistrationError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        userFetchLoginPending(state) {
            state.isLoading = true;
        },
        userFetchLoginSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.error = '';
            state.user = action.payload;
            state.isAuth = true;
        },
        userFetchLoginError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer;