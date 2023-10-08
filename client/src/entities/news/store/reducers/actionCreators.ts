import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewsService } from "../../service";
import { IValuesCreatePieceOfNews } from "../../../../shared";
import { TeacherService } from "../../../teacher";

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