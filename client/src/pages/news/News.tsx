import {OstudLink, OstudLoader, useAppDispatch, useAppSelector} from "../../shared";
import {useEffect, useState} from "react";
import {getNews} from "../../entities";
import {ErrorPage} from "../error";
import {Container, Pagination, Stack, Typography, useTheme} from "@mui/material";
import {Badge, Flex} from "@radix-ui/themes";
import 'react-quill/dist/quill.snow.css';

export function News() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { news, isLoading, error } = useAppSelector((state) => state.newsReducer);

    const [value, setValue] = useState<string>('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    if (isLoading) {
        return <OstudLoader />;
    }

    if (error) {
        return <ErrorPage errorMessage={error} />;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedNews = news.slice(startIndex, endIndex);

    return (
        <Flex style={{flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h6" sx={{marginY: 2}}>Навчально-пізнавальний вістник "
                <span style={{color: theme.palette.ostudYellowPrimary}}>С</span>
                <span style={{color: theme.palette.ostudYellowPrimary}}>Т</span>
                <span style={{color: theme.palette.ostudYellowPrimary}}>У</span>
                <span style={{color: theme.palette.ostudYellowPrimary}}>Д</span>ень"
            </Typography>
            <Container sx={{marginTop: 5}} maxWidth="md">
                    <Flex direction="column" justify="center">
                        <Stack spacing={2}>
                            {paginatedNews.map((item) => (
                                <div key={item._id}>
                                    <Flex justify="between">
                                        <OstudLink to={`/news/${item._id}`} color="primary">
                                            {item.title}
                                        </OstudLink>
                                        <Flex gap="2">
                                            <Badge color="orange">
                                                {item.teacher_name} {item.teacher_surname}
                                            </Badge>
                                            <Typography variant="body2">
                                                {item.dateOfCreation.slice(0,10)}
                                            </Typography>
                                        </Flex>
                                    </Flex>
                                </div>
                            ))}
                        </Stack>
                        <Pagination
                            count={Math.ceil(news.length / itemsPerPage)}
                            page={page}
                            showFirstButton
                            showLastButton
                            onChange={(_, num) => setPage(num)}
                            sx={{marginY: 3, alignSelf: "center"}}
                        />
                    </Flex>
            </Container>
        </Flex>
    );
}
