import { FetchResult } from "@apollo/client";
import { IResponse } from "../models";
import { apolloClient } from "../../../app/providers";
import { GET_NEWS } from "../../../features";

export class NewsService {
    static async getNews(): Promise<FetchResult<IResponse>> {
        return apolloClient.query<IResponse>({
            query: GET_NEWS,
        })
    }
}