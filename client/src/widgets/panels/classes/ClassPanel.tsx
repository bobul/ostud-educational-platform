import {OstudLoader, OstudPanel, useAppDispatch, useAppSelector} from "../../../shared";
import {useEffect, useState} from "react";
import {getClassesByTeacherId, IClass, TeacherService} from "../../../entities";
import {ErrorPage} from "../../../pages";

export function ClassPanel() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.userReducer);
    const {classes, isLoading, error} = useAppSelector((state) => state.classesReducer);
    const [addedClass, setAddedClass] = useState<IClass>();

    useEffect(() => {
        dispatch(getClassesByTeacherId(user.id))
    }, [dispatch, addedClass])

    const handleCreateClass = async (letter: string, number: number, teacher_id: string) => {
        const newClassResult = await TeacherService.createClass({ letter, number, teacher_id });
        setAddedClass(newClassResult.data?.createClass)
    }

    if (isLoading) {
        return <OstudLoader/>
    }

    if (error) {
        return <ErrorPage errorMessage={error}/>
    }

    return (
        <div>
            <OstudPanel title="Ваші класи: " type='class' items={classes} action={handleCreateClass}/>
        </div>
    );
}