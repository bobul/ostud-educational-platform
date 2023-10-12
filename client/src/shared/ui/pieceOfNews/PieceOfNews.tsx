import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getPieceOfNewsById} from "../../../entities";
import {OstudLoader} from "../loader";
import {ErrorPage} from "../../../pages";

export function PieceOfNews() {
    const {newsId} = useParams();
    const dispatch = useAppDispatch();
    const {news, isLoading, error} = useAppSelector(state => state.newsReducer);

    useEffect(() => {
        if (newsId) {
            dispatch(getPieceOfNewsById(newsId));
        }
    }, [dispatch, newsId]);

    if (isLoading) {
        return <OstudLoader/>;
    }

    if (error) {
        return <ErrorPage errorMessage={error}/>;
    }

    return (
        <div>
            {
                news[0].image ? <img src={"http://localhost:8080/static/images/" + news[0].image} alt=""/> : null
            }
            <img src={"http://localhost:8080/static/images/" + news[0].image} alt=""/>
            <h1>{news[0].title}</h1>
            <p>{news[0].description}</p>
            <p>Aвтор: {news[0].teacher_name} {news[0].teacher_surname}</p>
            <p>Дата: {news[0].dateOfCreation}</p>
        </div>
    );
};