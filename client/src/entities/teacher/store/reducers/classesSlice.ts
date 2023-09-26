import {IClass} from "../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getClassById, getClassesByTeacherId} from "./actionCreators.ts";

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
        [getClassesByTeacherId.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getClassesByTeacherId.fulfilled.type]: (state, action: PayloadAction<IClass[]>) => {
            state.isLoading = false;
            state.classes = action.payload;
            state.error = '';
        },
        [getClassesByTeacherId.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getClassById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getClassById.fulfilled.type]: (state, action: PayloadAction<IClass>) => {
            state.isLoading = false;
            state.classes[0] = action.payload;
            state.error = '';
        },
        [getClassById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default classesSlice.reducer;
