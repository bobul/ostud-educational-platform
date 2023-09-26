import {IValuesCreateClass} from "../../../shared";
import {FetchResult} from "@apollo/client";
import {apolloClient} from "../../../app/providers";
import {ICreateClassResponse, IGetClassById, IGetClassesByTeacherId} from "../models";
import {CREATE_CLASS, GET_CLASS_BY_ID, GET_CLASSES_BY_TEACHER_ID} from "../../../features";

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
}