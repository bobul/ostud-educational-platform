import {IValuesCreateClass, OstudLink, OstudLoader, OstudPanel, useAppDispatch, useAppSelector} from "../../../shared";
import {useEffect, useState} from "react";
import {getClassesByTeacherId, IClass, TeacherService} from "../../../entities";
import {ErrorPage} from "../../../pages";
import {IOstudDialogProps} from "../../../shared";
import {Table} from "@radix-ui/themes";

export function ClassPanel() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.userReducer);
    const {classes, isLoading, error} = useAppSelector((state) => state.classesReducer);
    const [addedClass, setAddedClass] = useState<IClass>();

    useEffect(() => {
        dispatch(getClassesByTeacherId(user.id))
    }, [dispatch, addedClass])


    if (isLoading) {
        return <OstudLoader/>
    }

    if (error) {
        return <ErrorPage errorMessage={error}/>
    }

    const handleCreateClass = async (values: IValuesCreateClass) => {
        const newClassResult = await TeacherService.createClass({
            ...values,
            teacher_id: user.id
        });
        setAddedClass(newClassResult.data?.createClass)
    }

    const DialogConfig: IOstudDialogProps = {
        title: "Створити новий клас.",
        subtitle: "Заповніть необхідні поля для створення нового класу.",
        fields: [
            {
                name: "number",
                label: "Номер класу",
                placeholder: "Введіть порядковий номер вашого класу"
            },
            {
                name: "letter",
                label: "Літера класу",
                placeholder: "Введіть літеру вашого класу"
            }
        ],
        submitText: "Зберегти",
        cancelText: "Відмінити",
        cells: [
            'Номер класу',
            'Літера класу',
            'Посилання'
        ],
        action: handleCreateClass
    }


    const renderedItems = classes.map((item) => {
        return (
            <Table.Row key={item._id}>
                <Table.RowHeaderCell>{item.number}</Table.RowHeaderCell>
                <Table.Cell>{item.letter}</Table.Cell>
                <Table.Cell>
                    <OstudLink color="primary"
                               to={`/classes/${item._id}`}>
                        Перейти до класу
                    </OstudLink>
                </Table.Cell>
            </Table.Row>
        )
    })

    return (
        <div>
            <OstudPanel title="Ваші класи: "
                        renderedItems={renderedItems}
                        dialogConfig={DialogConfig}/>
        </div>
    );
}