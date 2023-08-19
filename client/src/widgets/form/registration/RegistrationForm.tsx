import {
    Box,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid, InputLabel, MenuItem, Select,
    Typography,
} from "@mui/material";
import {Link} from "react-router-dom"
import {OstudTextField} from "../../../shared/ui/textfield";
import {OstudButton} from "../../../shared/ui/button";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../../app/providers/mui";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {OstudDatePicker} from "../../../shared/ui/datePicker";
import {OstudFormControl} from "../../../shared/ui/select";
import {OstudCheckbox} from "../../../shared/ui/checkbox";
import React from "react";
import {OstudIcon} from "../../../shared/ui/icon";

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

export function RegistrationForm() {
    //JUST FOR TEST !!!
    // TODO: implement controlled components and link with golang
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
        });
    };

    return (
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
                        <OstudIcon />
                        <Typography component="h1"
                                    variant="h5">
                            Створи свій обліковий запис
                        </Typography>
                        <Box component="form"
                             noValidate
                             onSubmit={handleSubmit}
                             sx={{mt: 3}}>
                            <Grid container
                                  spacing={3}>
                                <Grid item
                                      xs={12}
                                      sm={6}>
                                    <OstudTextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Iм'я"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item
                                      xs={12}
                                      sm={6}>
                                    <OstudTextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Прізвище"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item
                                      xs={12}>
                                    <OstudTextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Електронна пошта"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item
                                      xs={12}>
                                    <OstudDatePicker
                                        label="Встановіть дату народження"
                                    />
                                </Grid>
                                <Grid item
                                      xs={12}>
                                    <OstudFormControl fullWidth>
                                        <InputLabel id="role-label">Виберіть свою роль:</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            id="role"
                                            defaultValue="student"
                                            label="Виберіть свою роль:"
                                        >
                                            <MenuItem value="student">Учень</MenuItem>
                                            <MenuItem value="teacher">Вчитель</MenuItem>
                                        </Select>
                                    </OstudFormControl>
                                </Grid>
                                <Grid item
                                      xs={12}>
                                    <OstudTextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Пароль"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
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
                            >
                                Cтворити
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
                    <Copyright sx={{mt: 3}}/>
                </Container>
            </ThemeProvider>
        </LocalizationProvider>
    )
}