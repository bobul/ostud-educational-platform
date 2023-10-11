import { IPieceOfNews } from "../store";

export interface IResponse {
    getNews: IPieceOfNews[]
}

export interface IGetNewsByTeacherIdResponse {
    getNewsByTeacherId: IPieceOfNews[]
}

export interface IGetPieceOfNewsByIdResponse {
    getPieceOfNewsById: IPieceOfNews
}