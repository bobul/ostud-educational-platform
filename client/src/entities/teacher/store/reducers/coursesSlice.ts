import {ICourse} from "../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCourseById, getCoursesByClassId} from "./actionCreators";


export interface CoursesState {
    courses: ICourse[];
    isLoading: boolean;
    error: string;
}

const initialState: CoursesState = {
    courses: [],
    isLoading: false,
    error: "",
};

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: {
        [getCoursesByClassId.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getCoursesByClassId.fulfilled.type]: (state, action: PayloadAction<ICourse[]>) => {
            state.isLoading = false;
            state.courses = action.payload;
            state.error = '';
        },
        [getCoursesByClassId.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getCourseById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getCourseById.fulfilled.type]: (state, action: PayloadAction<ICourse>) => {
            state.isLoading = false;
            state.courses[0] = action.payload;
            state.error = '';
        },
        [getCourseById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default coursesSlice.reducer;