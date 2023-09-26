import {OstudLoader, useAppDispatch, useAppSelector} from "../../shared";
import {useEffect} from "react";
import {getClassById} from "../../entities";
import {useParams} from "react-router-dom";
import {ErrorPage} from "../error";
import {CoursePanel} from "../../widgets";

export function ClassPage() {
    const dispatch = useAppDispatch();
    const {classes, error, isLoading} = useAppSelector(state => state.classesReducer);
    const { classId } = useParams();

    useEffect(() => {
        if (classId) {
            dispatch(getClassById(classId));
        }
    }, [dispatch, classId])

    if (isLoading) {
        return <OstudLoader/>
    }

    if (error) {
        return <ErrorPage errorMessage={error}/>
    }

    return (
        <div>
            Welcome to {classes[0].number}, {classes[0].letter}
            <CoursePanel/>
        </div>
    );
}