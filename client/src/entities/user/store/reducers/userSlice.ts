import {IUser, UserRole} from "../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user: IUser;
    isLoading: boolean;
    error: string;
}

const initialUser: IUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.student,
    password: '',
    rd: undefined,
    dob: undefined
}

const initialState: UserState = {
    user: initialUser,
    isLoading: false,
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
        },
        userFetchLoginError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer;