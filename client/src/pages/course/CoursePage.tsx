import {useParams} from "react-router-dom";
import {ErrorPage} from "../error";
import {useEffect} from "react";
import {OstudLoader, useAppDispatch, useAppSelector} from "../../shared";
import {getCourseById} from "../../entities";


export function CoursePage() {
    const dispatch = useAppDispatch();
    const {courses, isLoading, error} = useAppSelector(state => state.coursesReducer);
    const {courseId} = useParams();

    useEffect(() => {
        if(courseId) {
            dispatch(getCourseById(courseId))
        }
        }, [dispatch, courseId]
    )

    if (isLoading) {
        return <OstudLoader/>
    }
    if (!courseId) {
        return <ErrorPage errorMessage={"Bad course id"}/>
    }
    if (error) {
        return <ErrorPage errorMessage={error}/>
    }

    return (
        <div>
            <div className="">Title: {courses[0].title}</div>
            <div className="">Description: {courses[0].description}</div>
        </div>
    );
}