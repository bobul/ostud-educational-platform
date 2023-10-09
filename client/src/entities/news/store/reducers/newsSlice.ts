import { IPieceOfNews } from "../models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNews, getNewsByTeacherId } from "./actionCreators";

export interface NewsState {
    news: IPieceOfNews[];
    isLoading: boolean;
    error: string;
}

const initialState: NewsState = {
    news: [],
    isLoading: false,
    error: "",
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: {
        [getNews.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getNews.fulfilled.type]: (state, action: PayloadAction<IPieceOfNews[]>) => {
            state.isLoading = false;
            state.news = action.payload;
            state.error = '';
        },
        [getNews.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getNewsByTeacherId.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getNewsByTeacherId.fulfilled.type]: (state, action: PayloadAction<IPieceOfNews[]>) => {
            state.isLoading = false;
            state.news = action.payload;
            state.error = '';
        },
        [getNewsByTeacherId.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
});

export default newsSlice.reducer