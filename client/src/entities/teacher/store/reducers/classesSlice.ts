import {IClass} from "../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getClassesById} from "./actionCreators.ts";

export interface ClassesState {
    classes: IClass[];
    isLoading: boolean;
    error: string;
}

const initialState: ClassesState = {
    classes: [],
    isLoading: false,
    error: "",
};

export const classesSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {},
    extraReducers: {
        [getClassesById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getClassesById.fulfilled.type]: (state, action: PayloadAction<IClass[]>) => {
            state.isLoading = false;
            state.classes = action.payload;
            state.error = '';
        },
        [getClassesById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default classesSlice.reducer;
