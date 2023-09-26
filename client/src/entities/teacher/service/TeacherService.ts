import {IValuesCreateClass, IValuesCreateCourse} from "../../../shared";
import {FetchResult} from "@apollo/client";
import {apolloClient} from "../../../app/providers";
import {
    ICreateClassResponse,
    ICreateCourseResponse,
    IGetClassById,
    IGetClassesByTeacherId, IGetCourseById,
    IGetCoursesByClassId
} from "../models";
import {
    CREATE_CLASS,
    CREATE_COURSE,
    GET_CLASS_BY_ID,
    GET_CLASSES_BY_TEACHER_ID, GET_COURSE_BY_ID,
    GET_COURSES_BY_CLASS_ID
} from "../../../features";

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
}