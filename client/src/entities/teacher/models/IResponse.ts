import {IClass} from "../store";

export interface ICreateClassResponse {
    createClass: IClass
}

export interface IGetClassesById {
    getClassesById: IClass[]
}