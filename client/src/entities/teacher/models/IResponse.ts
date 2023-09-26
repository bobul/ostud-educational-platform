import {IClass} from "../store";
import {ICourse} from "../store";

export interface ICreateClassResponse {
    createClass: IClass
}

export interface IGetClassesByTeacherId {
    getClassesByTeacherId: IClass[]
}

export interface IGetClassById {
    getClassById: IClass
}

export interface ICreateCourseResponse {
    createCourse: ICourse
}

export interface IGetCoursesByClassId {
    getCoursesByClassId: ICourse[]
}

export interface IGetCourseById {
    getCourseById: ICourse
}