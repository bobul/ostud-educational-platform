import {IOtherUser, IUser, UserRole} from "../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUserById} from "./actionCreators";

export interface OtherUserState {
    otherUser: IOtherUser;
    isOtherLoading?: boolean;
    otherError: string;
}

const initialOtherUser: IOtherUser = {
    id: '',
    role: UserRole.student,
    firstName: '',
    lastName: '',
    email: '',
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

