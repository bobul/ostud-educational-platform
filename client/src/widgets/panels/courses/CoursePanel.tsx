import {
    IValuesCreateCourse,
    OstudLoader,
    OstudPanel,
    useAppDispatch,
    useAppSelector,
    IOstudDialogProps, OstudLink
} from "../../../shared";
import {getCoursesByClassId, ICourse, TeacherService} from "../../../entities";
import {useEffect, useState} from "react";
import {ErrorPage} from "../../../pages";
import {Link} from "react-router-dom";

interface CoursePanelProps {
    classId: string
}

export function CoursePanel({classId}: CoursePanelProps) {
    const dispatch = useAppDispatch();
    const {courses, isLoading, error} = useAppSelector((state) => state.coursesReducer);
    const [addedCourse, setAddedCourse] = useState<ICourse>();

    useEffect(() => {
        if (classId) {
            dispatch(getCoursesByClassId(classId));
        }
    }, [dispatch, addedCourse])

    if (isLoading) {
        return <OstudLoader/>
    }

    if (error) {
        return <ErrorPage errorMessage={error}/>
    }

    const handleCreateCourse = async (values: IValuesCreateCourse) => {
        const newCourseResult = await TeacherService.createCourse({
            ...values,
            class_id: classId
        });
        setAddedCourse(newCourseResult.data?.createCourse)
    }

    const DialogConfig: IOstudDialogProps = {
        title: "Створити новий курс.",
        subtitle: "Заповніть необхідні поля для створення нового курсу.",
        fields: [
            {
                name: "title",
                label: "Назва курсу",
                placeholder: "Введіть назву вашого курсу"
            },
            {
                name: "description",
                label: "Короткий опис курсу",
                placeholder: "Зробіть опис вашого курсу"
            }
        ],
        submitText: "Зберегти",
        cancelText: "Відмінити",
        action: handleCreateCourse
    }

    const renderedItems = courses.map((item) => {
        return (
            <li key={item._id}>
                <OstudLink color="primary" to={`/courses/${item._id}`}>
                    Course {item.title} {item.description}
                </OstudLink>
            </li>
        )
    })

    return (
        <div>
            <OstudPanel title='Ваші курси: '
                        renderedItems={renderedItems}
                        dialogConfig={DialogConfig}/>
        </div>
    );
}