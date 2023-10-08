import { IClass, ICourse } from "../store";
import { IPieceOfNews } from "../../news/store";

export interface ICreateClassResponse {
    createClass: IClass
}

export interface IUpdateClass {
    updateClass: IClass
}

export interface IDeleteClass {
    deleteClass: IClass
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

export interface ICreatePieceOfNews {
    createPieceOfNews: IPieceOfNews
}