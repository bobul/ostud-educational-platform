import {
    IOstudDialogProps,
    IValuesCreatePieceOfNews,
    OstudPanel,
    useAppDispatch,
    useAppSelector
} from "../../../shared";
import { Table } from "@radix-ui/themes";
import { TeacherService, getNewsByTeacherId, IPieceOfNews } from "../../../entities";
import { useEffect, useState } from "react";

export function NewsPanel() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.userReducer);
    const { news } = useAppSelector(state => state.newsReducer);
    const [addedPieceOfNews, setAddedPieceOfNews] = useState<IPieceOfNews>();
    const cells: Array<string> = ['Назва', 'Опис', "Дата створення"];

    useEffect(() => {
        dispatch(getNewsByTeacherId(user.id));
    }, [dispatch, addedPieceOfNews])

    const handleCreatePieceOfNews = async (values: IValuesCreatePieceOfNews) => {
        const newClassResult = await TeacherService.createPieceOfNews({
            ...values,
            teacher_id: user.id,
            teacher_name: user.firstName,
            teacher_surname: user.lastName
        });
        setAddedPieceOfNews(newClassResult.data?.createPieceOfNews)
    }
    const DialogConfig: IOstudDialogProps = {
        title: "Створіть новину",
        subtitle: "Заповніть необхідні поля для створення новини.",
        fields: [
            {
                name: "title",
                label: "Заголовок",
                placeholder: "Введіть заголовок вашої новини"
            },
            {
                name: "description",
                label: "Опис",
                placeholder: "Введіть опис вашої новини"
            }
        ],
        submitText: "Зберегти",
        cancelText: "Відмінити",
        variant: "news",
        action: handleCreatePieceOfNews
    }
    const renderedItems = news.map((item) => {
        return (
            <Table.Row key={item._id}>
                <Table.RowHeaderCell>{item.title}</Table.RowHeaderCell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.dateOfCreation}</Table.Cell>
            </Table.Row>
        )
    })
    return (
        <div>
            <OstudPanel title="Бажаєте додати новину на головну сторінку?"
                        renderedItems={renderedItems}
                        dialogConfig={DialogConfig}
                        cells={cells}/>
        </div>
    );
}