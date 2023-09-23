import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherService} from "../../service";

export const getClassesById = createAsyncThunk(
    'classes/getClassesById',
    async (id: string, thunkAPI) => {
        try {
            const response = await TeacherService.getClassesById(id);
            return response.data?.getClassesById;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)