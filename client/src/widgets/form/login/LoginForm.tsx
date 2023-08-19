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
import {OstudDatePicker} from "../../../shared/ui/datePicker";
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

export function LoginForm() {
    //JUST FOR TEST !!!
    // TODO: implement controlled components and link with golang

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
                        <OstudIcon/>
                        <Typography component="h1"
                                    variant="h5">
                            Увійти до облікового запису
                        </Typography>
                        <Box component="form"
                             noValidate
                             sx={{mt: 3}}>
                            <Grid container
                                  spacing={3}>
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
                                      xs={12}
                                      sx={{mb: 3}}>
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
    )
}