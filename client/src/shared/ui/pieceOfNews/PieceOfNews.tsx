import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getPieceOfNewsById } from "../../../entities";
import { OstudLoader } from "../loader";
import { ErrorPage } from "../../../pages";
import { Box, Stack } from "@mui/material";
import { Flex } from "@radix-ui/themes";

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
            <Flex justify="center" style={{marginTop: "1rem"}}>
                <Stack spacing={2}>
                    <Box component="img"
                         src={"http://localhost:8080/static/images/" + news[0].image}
                         sx={{width: "450px", height: "400px"}}
                    />
                    <Flex direction="column">
                        <h1>{news[0].title}</h1>
                        <p>{news[0].description}</p>
                        <p style={{alignSelf: "flex-end"}}>Aвтор: {news[0].teacher_name} {news[0].teacher_surname}</p>
                        <p style={{alignSelf: "flex-end"}}>Дата: {news[0].dateOfCreation}</p>
                    </Flex>
                </Stack>
            </Flex>
        </div>
    );
};