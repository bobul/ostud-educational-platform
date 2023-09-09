import {IUser, UserRole} from "../models/IUser.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUserById} from "./actionCreators";

export interface OtherUserState {
    otherUser: IUser;
    isOtherLoading: boolean;
    otherError: string;
}

const initialOtherUser: IUser = {
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

const initialState: OtherUserState = {
    otherUser: initialOtherUser,
    isOtherLoading: false,
    otherError: '',
};

export const otherUserSlice = createSlice({
    name: 'otherUser',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getUserById.pending.type]: (state) => {
            state.isOtherLoading = true;
        },
        [getUserById.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isOtherLoading = false;
            state.otherError = '';
            state.otherUser = action.payload;
        },
        [getUserById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isOtherLoading = false;
            state.otherError = action.payload;
        },
    }
})

export default otherUserSlice.reducer;

