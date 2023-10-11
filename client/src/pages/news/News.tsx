import { useEffect } from "react";
import { OstudLoader, useAppDispatch, useAppSelector } from "../../shared";
import { ErrorPage } from "../error";
import { getNews } from "../../entities";

export function News () {
    const dispatch = useAppDispatch();
    const {news, isLoading, error} = useAppSelector(state => state.newsReducer);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch])

    if (isLoading) {
        return <OstudLoader/>
    }

    if (error) {
        return <ErrorPage errorMessage={error}/>
    }

    return (
        <div>
            {news.map((item) => (
                <div key={item._id}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <i>Автор: {item.teacher_name} {item.teacher_surname}</i>
                    <div></div>
                    <b>Дата:</b> {item.dateOfCreation}
                </div>
            ))}
        </div>
    );
}
