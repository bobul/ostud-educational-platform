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
import {Table} from "@radix-ui/themes";

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
        variant: "create",
        action: handleCreateCourse
    }

    const cells: Array<string> = ['Назва курсу', 'Короткий опис курсу', 'Посилання'];

    const renderedItems = courses.map((item) => {
        return (
            <Table.Row key={item._id}>
                <Table.RowHeaderCell>{item.title}</Table.RowHeaderCell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>
                    <OstudLink color="primary"
                               to={`/courses/${item._id}`}>
                        Перейти до курсу
                    </OstudLink>
                </Table.Cell>
            </Table.Row>
        )
    })

    return (
        <div>
            <OstudPanel title='Ваші курси: '
                        cells={cells}
                        renderedItems={renderedItems}
                        dialogConfig={DialogConfig}/>
        </div>
    );
}