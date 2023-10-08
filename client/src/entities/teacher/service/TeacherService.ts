import { IValuesCreateClass, IValuesCreateCourse, IValuesCreatePieceOfNews, IValuesUpdateClass } from "../../../shared";
import { FetchResult } from "@apollo/client";
import { apolloClient } from "../../../app/providers";
import {
    ICreateClassResponse,
    ICreateCourseResponse, ICreatePieceOfNews, IDeleteClass,
    IGetClassById,
    IGetClassesByTeacherId, IGetCourseById,
    IGetCoursesByClassId, IUpdateClass
} from "../models";
import {
    CREATE_CLASS,
    CREATE_COURSE, DELETE_CLASS,
    GET_CLASS_BY_ID,
    GET_CLASSES_BY_TEACHER_ID, GET_COURSE_BY_ID,
    GET_COURSES_BY_CLASS_ID, UPDATE_CLASS
} from "../../../features";
import { CREATE_PIECE_OF_NEWS } from "../../../features/mutation/createPieceOfNews";

export class TeacherService {
    static async createClass(values: IValuesCreateClass): Promise<FetchResult<ICreateClassResponse>> {
        return apolloClient.mutate<ICreateClassResponse>({
            mutation: CREATE_CLASS,
            variables: {
                input: {
                    ...values
                }
            }
        })
    }

    static async updateClass(values: IValuesUpdateClass): Promise<FetchResult<IUpdateClass>> {
        return apolloClient.mutate<IUpdateClass>({
            mutation: UPDATE_CLASS,
            variables: {
                input: {
                    ...values
                }
            }
        })
    }

    static async deleteClass(id: string): Promise<FetchResult<IDeleteClass>> {
        return apolloClient.mutate<IDeleteClass>({
            mutation: DELETE_CLASS,
            variables: {
                id
            }
        })
    }

    static async getClassesByTeacherId(id: string): Promise<FetchResult<IGetClassesByTeacherId>> {
        return apolloClient.query<IGetClassesByTeacherId>({
            query: GET_CLASSES_BY_TEACHER_ID,
            variables: {
                id
            }
        })
    }

    static async getClassById(id: string): Promise<FetchResult<IGetClassById>> {
        return apolloClient.query<IGetClassById>({
            query: GET_CLASS_BY_ID,
            variables: {
                id
            }
        })
    }

    static async createCourse(values: IValuesCreateCourse): Promise<FetchResult<ICreateCourseResponse>> {
        return apolloClient.mutate<ICreateCourseResponse>({
            mutation: CREATE_COURSE,
            variables: {
                input: {
                    ...values
                }
            }
        })
    }

    static async getCoursesByClassId(id: string): Promise<FetchResult<IGetCoursesByClassId>> {
        return apolloClient.query<IGetCoursesByClassId>({
            query: GET_COURSES_BY_CLASS_ID,
            variables: {
                id
            }
        })
    }

    static async getCourseById(id: string): Promise<FetchResult<IGetCourseById>> {
        return apolloClient.query<IGetCourseById>({
            query: GET_COURSE_BY_ID,
            variables: {
                id
            }
        })
    }

    static async createPieceOfNews(values: IValuesCreatePieceOfNews): Promise<FetchResult<ICreatePieceOfNews>> {
        return apolloClient.mutate<ICreatePieceOfNews>({
            mutation: CREATE_PIECE_OF_NEWS,
            variables: {
                input: {
                    ...values
                }
            }
        })
    }
}