import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewsService } from "../../service";

export const getNews = createAsyncThunk(
    'news/getNews',
    async (_, thunkAPI) => {
        try {
            const response = await NewsService.getNews();
            return response.data?.getNews;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    },
);

export const getNewsByTeacherId = createAsyncThunk(
    'news/getNewsByTeacherId',
    async (id: string, thunkAPI) => {
        try {
            const response = await NewsService.getNewsByTeacherId(id);
            return response.data?.getNewsByTeacherId;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    },
);

export const getPieceOfNewsById = createAsyncThunk(
    'news/getPieceOfNewsById',
    async (id: string, thunkAPI) => {
        try {
            const response = await NewsService.getPieceOfNewsById(id);
            return response.data?.getPieceOfNewsById;
        } catch (e: any) {
            throw thunkAPI.rejectWithValue(e.message);
        }
    },
);