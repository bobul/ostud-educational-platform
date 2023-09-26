import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeacherService} from "../../service";

export const getClassesByTeacherId = createAsyncThunk(
    'classes/getClassesByTeacherId',
    async (id: string, thunkAPI) => {
        try {
            const response = await TeacherService.getClassesByTeacherId(id);
            return response.data?.getClassesByTeacherId;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getClassById = createAsyncThunk(
    'classes/getClassById',
    async (id: string, thunkAPI) => {
        try {
            const response = await TeacherService.getClassById(id);
            return response.data?.getClassById;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getCoursesByClassId = createAsyncThunk(
    'courses/getCoursesByClassId',
    async (id: string, thunkAPI) => {
        try {
            const response = await TeacherService.getCoursesByClassId(id);
            return response.data?.getCoursesByClassId;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getCourseById = createAsyncThunk(
    'courses/getCourseById',
    async (id: string, thunkAPI) => {
        try {
            const response = await TeacherService.getCourseById(id);
            return response.data?.getCourseById;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    }
)