import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Typography,
} from "@mui/material";
import {Link} from "react-router-dom"
import {OstudTextField} from "../../../shared/ui/textfield";
import {OstudButton} from "../../../shared/ui/button";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../../app/providers/mui";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {OstudIcon} from "../../../shared/ui/icon";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useMutation} from "@apollo/client";
import {USER_LOGIN} from "../../../features/session/login";

function Copyright(props: any) {
    return (
        <Typography variant="body2"
                    color="text.secondary"
                    align="center" {...props}>
            {'Copyright © '}
            <Link to={'/'}>
                OSTUD
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export function LoginForm() {

    interface Values {
        email: string;
        password: string;
    }

    const [userLogin] = useMutation(USER_LOGIN)

    const validationSchema = Yup.object({
        email: Yup.string().email('Неправильна адреса електронної пошти.').required('Це поле обов\'язкове.'),
        password: Yup.string().required('Це поле обов\'язкове.'),
    });

    const initialValues: Values = {
        email: '',
        password: ''
    }

    const onSubmit = (values: Values) => {
        console.log(values)
        userLogin({variables: {
                ...values
            }}).then((data) => {
            console.log(data)
        })
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
                                <Copyright sx={{mt: 3}}/>
                            </Container>
                        </ThemeProvider>
                    </LocalizationProvider>
                </Form>
            )}
        </Formik>
    )
}