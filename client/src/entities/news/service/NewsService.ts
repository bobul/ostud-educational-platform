import { FetchResult } from "@apollo/client";
import { IGetNewsByTeacherIdResponse, IResponse } from "../models";
import { apolloClient } from "../../../app/providers";
import { GET_NEWS, GET_NEWS_BY_TEACHER_ID } from "../../../features";

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
}