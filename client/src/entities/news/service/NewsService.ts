import { FetchResult } from "@apollo/client";
import { IGetNewsByTeacherIdResponse, IGetPieceOfNewsByIdResponse, IResponse } from "../models";
import { apolloClient } from "../../../app/providers";
import { GET_NEWS, GET_NEWS_BY_TEACHER_ID, GET_PIECE_OF_NEWS_BY_ID } from "../../../features";

export class NewsService {
    static async getNews(): Promise<FetchResult<IResponse>> {
        return apolloClient.query<IResponse>({
            query: GET_NEWS,
        })
    }

    static async getNewsByTeacherId(id: string): Promise<FetchResult<IGetNewsByTeacherIdResponse>> {
        return apolloClient.query<IGetNewsByTeacherIdResponse>({
            query: GET_NEWS_BY_TEACHER_ID,
            variables: {
                id
            }
        })
    }

    static async getPieceOfNewsById(id: string): Promise<FetchResult<IGetPieceOfNewsByIdResponse>> {
        return apolloClient.query<IGetPieceOfNewsByIdResponse>({
            query: GET_PIECE_OF_NEWS_BY_ID,
            variables: {
                id
            }
        })
    }
}