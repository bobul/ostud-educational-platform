import {IClass} from "../store";

export interface ICreateClassResponse {
    createClass: IClass
}

export interface IGetClassesByTeacherId {
    getClassesByTeacherId: IClass[]
}

export interface IGetClassById {
    getClassById: IClass
}