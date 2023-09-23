import {IValuesCreateClass} from "../../../shared";
import {FetchResult} from "@apollo/client";
import {apolloClient} from "../../../app/providers";
import {ICreateClassResponse, IGetClassesById} from "../models";
import {CREATE_CLASS, GET_CLASSES_BY_ID} from "../../../features";

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

    static async getClassesById(id: string): Promise<FetchResult<IGetClassesById>> {
        return apolloClient.query<IGetClassesById>({
            query: GET_CLASSES_BY_ID,
            variables: {
                id
            }
        })
    }
}