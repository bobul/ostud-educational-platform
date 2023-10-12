import {
    IValuesCreateClass,
    OstudButton, OstudDialogPanel,
    OstudLink,
    OstudLoader,
    OstudPanel,
    useAppDispatch,
    useAppSelector,
    IOstudDialogProps, IValuesUpdateClass
} from "../../../shared";
import {useEffect, useState} from "react";
import {getClassesByTeacherId, IClass, TeacherService} from "../../../entities";
import {ErrorPage} from "../../../pages";
import {Flex, Table, AlertDialog} from "@radix-ui/themes";
import {Delete, Edit} from "@mui/icons-material";

export function ClassPanel() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.userReducer);
    const {classes, isLoading, error} = useAppSelector((state) => state.classesReducer);
    const [addedClass, setAddedClass] = useState<IClass>();
    const [updatedClass, setUpdatedClass] = useState<IClass>();
    const [deletedClass, setDeletedClass] = useState<IClass>();
    const cells: Array<string> = ['Номер класу', 'Літера класу', 'Посилання', 'Дії'];

    useEffect(() => {
        dispatch(getClassesByTeacherId(user.id))
    }, [dispatch, addedClass, updatedClass, deletedClass])

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

    const handleUpdateClass = async (values: IValuesUpdateClass) => {
        console.log(values);
        const updatedClassResult = await TeacherService.updateClass({
            ...values
        });
        setUpdatedClass(updatedClassResult.data?.updateClass);
    }

    const handleDeleteClass = async (id: string) => {
        const deletedClassResult = await TeacherService.deleteClass(id);
        setDeletedClass(deletedClassResult.data?.deleteClass);
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
        variant: "create",
        action: handleCreateClass
    }

    const DialogUpdateConfig: IOstudDialogProps = {
        title: "Внесіть зміни до класу.",
        subtitle: "Наразі ви маєте змогу змінити дані про ваш клас.",
        fields: DialogConfig.fields,
        submitText: "Змінити",
        cancelText: "Cкасувати",
        variant: "update",
        action: handleUpdateClass
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
                <Table.Cell>
                    <Flex style={{gap: '1em'}}>
                        <OstudDialogPanel {...DialogUpdateConfig} _id={item._id}>
                            <OstudButton variant="contained">
                                <Edit/>
                            </OstudButton>
                        </OstudDialogPanel>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <OstudButton variant="contained"
                                             custombackgroundcolor="tomato">
                                    <Delete/>
                                </OstudButton>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content style={{maxWidth: 450}}>
                                <AlertDialog.Title>Видалити клас.</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Ви впевнені? Цей клас більш <b>НЕ</b> буде доступним та всі дані
                                    будуть <b>видалені</b>.
                                </AlertDialog.Description>
                                <Flex gap="3"
                                      mt="4"
                                      justify="end">
                                    <AlertDialog.Cancel>
                                        <OstudButton variant="contained"
                                                     custombackgroundcolor="lightgray">
                                            Скасувати
                                        </OstudButton>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <OstudButton variant="contained"
                                                     custombackgroundcolor="tomato"
                                                     onClick={() => handleDeleteClass(item._id)}
                                        >
                                            Видалити
                                        </OstudButton>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Flex>
                </Table.Cell>
            </Table.Row>
        )
    })

    return (
        <div>
            <OstudPanel title="Ваші класи: "
                        cells={cells}
                        renderedItems={renderedItems}
                        dialogConfig={DialogConfig}/>
        </div>
    );
}