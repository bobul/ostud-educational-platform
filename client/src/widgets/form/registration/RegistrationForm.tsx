import {
    Alert,
    Box,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Typography,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom"
import {OstudTextField} from "../../../shared/ui/textfield";
import {OstudButton} from "../../../shared/ui/button";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../../app/providers/mui";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {OstudCheckbox} from "../../../shared/ui/checkbox";
import {OstudIcon} from "../../../shared/ui/icon";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {OstudDatePicker} from "../../../shared/ui/datePicker";
import {OstudCopyright} from "../../../shared/ui/copyright";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import dayjs from 'dayjs';
import {OstudSelect} from "../../../shared/ui/fieldAsSelect";
import {IValuesRegister} from "../../../shared/models/IValuesRegister.ts";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks/redux";
import {fetchUserRegistration} from "../../../entities/user/store/reducers/actionCreators.ts";
import {useEffect} from "react";
import {IValuesFormik} from "../../../shared/models/IValuesFormik.ts";


export function RegistrationForm() {
    const dispatch = useAppDispatch()
    const {user, error} = useAppSelector(state => state.userReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.id) {
            if (user.role === 'student') {
                navigate(`/profile/${user.id}`)
            }
            if (user.role === 'teacher') {
                navigate(`/profile/a/${user.id}`)
            }
        }
    }, [user.id])

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Це поле обов\'язкове.'),
        lastName: Yup.string().required('Це поле обов\'язкове.'),
        email: Yup.string().email('Неправильна адреса електронної пошти.').required('Це поле обов\'язкове.'),
        dob: Yup.date().required('Це поле обов\'язкове.'),
        password: Yup.string()
            .min(8, 'В паролі необхідно мати щонайменше 8 символів. (Повинна бути хоча б одна цифра)')
            .matches(/[0-9]/, 'У вашому паролі не вистачає цифри.')
            .required('Це поле обов\'язкове.'),
    });

    const initialValues: IValuesFormik = {
        firstName: '',
        lastName: '',
        email: '',
        dob: new Date(),
        role: 'student',
        password: ''
    }


    const onSubmit = (values: IValuesFormik) => {

        const formattedDOB = values.dob.toISOString().slice(0, 10).split('-').reverse().join('.');

        const modifiedValues: IValuesRegister = {
            ...values,
            dob: formattedDOB,
        };

        console.log(modifiedValues)

        dispatch(fetchUserRegistration(modifiedValues));
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
                                        Створи свій обліковий запис
                                    </Typography>
                                    <Box sx={{mt: 3}}>
                                        <Grid container
                                              spacing={3}>
                                            {
                                                error === "you already have an account"
                                                    ? <Grid item
                                                            xs={12}>
                                                        <Alert severity="error">Обліковий запис з цією електронною поштою
                                                            вже існує.</Alert>
                                                    </Grid>
                                                    : null
                                            }
                                            <Grid item
                                                  xs={12}
                                                  sm={6}>
                                                <Field as={OstudTextField}
                                                       name="firstName"
                                                       required
                                                       fullWidth
                                                       id="firstName"
                                                       label="Iм'я"
                                                       autoFocus
                                                       error={formikProps.touched.firstName && !!formikProps.errors.firstName}
                                                       helperText={formikProps.touched.firstName && formikProps.errors.firstName}
                                                />
                                            </Grid>
                                            <Grid item
                                                  xs={12}
                                                  sm={6}>
                                                <Field as={OstudTextField}
                                                       required
                                                       fullWidth
                                                       id="lastName"
                                                       label="Прізвище"
                                                       name="lastName"
                                                       autoComplete="family-name"
                                                       error={formikProps.touched.lastName && !!formikProps.errors.lastName}
                                                       helperText={formikProps.touched.lastName && formikProps.errors.lastName}
                                                />
                                            </Grid>
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
                                                  xs={12}>
                                                <Field as={OstudDatePicker}
                                                       name="dob"
                                                       value={dayjs(formikProps.values.dob)}
                                                       onChange={(value: Date) => formikProps.setFieldValue("dob", value, true)}
                                                       label="Встановіть дату народження"
                                                       error={formikProps.touched.dob && !!formikProps.errors.dob}
                                                       helperText={formikProps.touched.dob && formikProps.errors.dob}
                                                />


                                            </Grid>
                                            <Grid item
                                                  xs={12}>
                                                <Field
                                                    name="role"
                                                    component={OstudSelect}
                                                    label="Виберіть свою роль:"
                                                    options={[
                                                        {value: 'student', label: 'Учень'},
                                                        {value: 'teacher', label: 'Вчитель'},
                                                    ]}
                                                />
                                            </Grid>
                                            <Grid item
                                                  xs={12}>
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
                                            <Grid item
                                                  xs={12}
                                                  sx={{mt: 1, mb: 3}}>
                                                <FormControlLabel
                                                    control={<OstudCheckbox/>}
                                                    label="Я хочу отримувати новини та повідомлення від мого освітнього закладу."
                                                />
                                            </Grid>
                                        </Grid>
                                        <OstudButton
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                        >Cтворити
                                        </OstudButton>
                                        <Grid container
                                              justifyContent="flex-end"
                                              sx={{mt: 3}}
                                        >
                                            <Grid item>
                                                <Link to={'/sign-in'}>
                                                    <Typography
                                                        color="black"
                                                        sx={{
                                                            textDecoration: 'underline',
                                                            '&:hover': {
                                                                cursor: 'pointer'
                                                            }
                                                        }}
                                                    >Вже маєте аккаунт? Увійти</Typography>
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