import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {IValuesLogin, OstudButton, OstudCopyright, OstudIcon, OstudTextField, useAppDispatch, useAppSelector} from "../../../shared/";
import {theme} from "../../../app/providers";
import {fetchUserLogin} from "../../../entities";
import {Alert, Box, Container, CssBaseline, Grid, Typography,} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export function LoginForm() {
    const dispatch = useAppDispatch();
    const {user, error} = useAppSelector(state => state.userReducer);

    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.id) {
            if (user.role === 'student') {
                navigate(`/profile/${user.id}`)
            }
            if (user.role === 'teacher') {
                navigate(`/profile/${user.id}`)
            }
        }
    }, [user.id])


    const validationSchema = Yup.object({
        email: Yup.string().email('Неправильна адреса електронної пошти.').required('Це поле обов\'язкове.'),
        password: Yup.string().required('Це поле обов\'язкове.'),
    });

    const initialValues: IValuesLogin = {
        email: '',
        password: ''
    }

    const onSubmit = (values: IValuesLogin) => {
        console.log(values)
        dispatch(fetchUserLogin(values))
    }

    return (
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            {(formikProps) => (
                <Form onSubmit={formikProps.handleSubmit}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <ThemeProvider theme={theme}>
                            <Container component="main"
                                       maxWidth="xs">
                                <CssBaseline/>
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <OstudIcon/>
                                    <Typography component="h1"
                                                variant="h5">
                                        Увійти до облікового запису
                                    </Typography>
                                    <Box sx={{mt: 3}}>
                                        <Grid container
                                              spacing={3}>
                                            {
                                                error === "wrong password"
                                                    ? <Grid item
                                                            xs={12}>
                                                        <Alert severity="error">Неправильний пароль! Спробуйте ще
                                                            раз.</Alert>
                                                    </Grid>
                                                    : null
                                            }
                                            <Grid item
                                                  xs={12}>
                                                <Field as={OstudTextField}
                                                       required
                                                       fullWidth
                                                       id="email"
                                                       label="Електронна пошта"
                                                       name="email"
                                                       autoComplete="email"
                                                       error={formikProps.touched.email && !!formikProps.errors.email}
                                                       helperText={formikProps.touched.email && formikProps.errors.email}
                                                />
                                            </Grid>
                                            <Grid item
                                                  xs={12}
                                                  sx={{mb: 3}}>
                                                <Field as={OstudTextField}
                                                       required
                                                       fullWidth
                                                       name="password"
                                                       label="Пароль"
                                                       type="password"
                                                       id="password"
                                                       autoComplete="new-password"
                                                       error={formikProps.touched.password && !!formikProps.errors.password}
                                                       helperText={formikProps.touched.password && formikProps.errors.password}
                                                />
                                            </Grid>
                                        </Grid>
                                        <OstudButton
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                        >
                                            Увійти
                                        </OstudButton>
                                        <Grid container
                                              justifyContent="flex-end"
                                              sx={{mt: 3}}
                                        >
                                            <Grid item>
                                                <Link to={'/sign-up'}>
                                                    <Typography
                                                        color="black"
                                                        sx={{
                                                            textDecoration: 'underline',
                                                            '&:hover': {
                                                                cursor: 'pointer'
                                                            }
                                                        }}
                                                    >Ще не маєте аккаунту? Створити</Typography>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                                <OstudCopyright sx={{mt: 3}}/>
                            </Container>
                        </ThemeProvider>
                    </LocalizationProvider>
                </Form>
            )}
        </Formik>
    )
}