import React, {useRef, useState, useEffect} from "react";
import * as Yup from "yup"
import {useAppSelector} from "../../hooks";
import {useAppDispatch} from "../../hooks";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {userLogout, fetchUserLogin, IUser} from "../../../entities";
import {IValuesLogin} from "../../models";
import {AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {OstudIcon} from "../icon";
import {OstudButton} from "../button";
import {Field, Form, Formik} from "formik";
import {OstudTextField} from "../textfield";


export function OstudNavbar() {
    const {user, isAuth} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [height, setHeight] = useState<number | null>(null);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }
    }, [ref.current]);

    useEffect(() => {
        console.log(height);
    }, [height]);

    const menuItems = [
        {key: 'news', label: 'Новини', to: "/news"},
        {key: 'students', label: 'Учням'},
        {key: 'teachers', label: 'Вчителям'},
        {key: 'faq', label: 'FAQ', to: "/faq"},
    ]

    const menuItemsSetting = [
        {
            key: 'user', label: 'Профіль', action: () => {
                navigateToProfile(user, navigate);
                handleCloseUserMenu();
            }
        },
        {key: 'setting', label: 'Налаштування'},
        {
            key: 'sign out', label: 'Вийти', action: () => {
                dispatch(userLogout());
                navigate('/');
                handleCloseUserMenu();
            }
        },
    ];

    const validationSchema = Yup.object({
        email: Yup.string().email('Неправильна адреса електронної пошти.').required('Це поле обов\'язкове.'),
        password: Yup.string().required('Це поле обов\'язкове.'),
    });

    const initialValues: IValuesLogin = {
        email: '',
        password: ''
    }

    const onSubmit = (values: IValuesLogin): void => {
        dispatch(fetchUserLogin(values));
        navigateToProfile(user, navigate);
    }

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (): void => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (): void => {
        setAnchorElUser(null);
    };

    const handleLogin = (): void => setLogin(!login);
    const [login, setLogin] = useState<boolean>(false);
    const [loginFormOpen, setLoginFormOpen] = useState<boolean>(false);

    const handleLoginClick = (): void => {
        setLoginFormOpen(true);
        handleCloseNavMenu();
    };

    const handleLoginFormClose = (): void => {
        setLoginFormOpen(false);
    };

    const navigateToProfile = (user: IUser, navigate: NavigateFunction): void => {
        if (user && user.id) {
            if (user.role === 'student') {
                navigate(`/profile/${user.id}`)
            }
            if (user.role === 'teacher') {
                navigate(`/profile/${user.id}`)
            }
        }
    }

    return (
        <AppBar position="static"
                color="inherit"
                style={{fontFamily: 'Coolvetica'}}
                ref={ref}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <OstudIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 10}}/>
                    <Typography
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                        }}
                    >
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <Link to="/news"
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                <MenuItem key={'news'}
                                          onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Новини</Typography>
                                </MenuItem>
                            </Link>
                            <MenuItem key={'students'}
                                      onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Учням</Typography>
                            </MenuItem>
                            <MenuItem key={'teachers'}
                                      onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Вчителям</Typography>
                            </MenuItem>
                            <Link to="/faq"
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                <MenuItem key={'faq'}
                                          onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">FAQ</Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                    <OstudIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        sx={{
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1
                        }}
                    >
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {menuItems.map((menuItem) => (
                            menuItem.to ? (
                                <Link key={menuItem.key}
                                      to={menuItem.to}
                                      style={{textDecoration: 'none', color: 'inherit'}}>
                                    <OstudButton
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, display: 'block'}}
                                        customcolor='black'
                                    >
                                        {menuItem.label}
                                    </OstudButton>
                                </Link>
                            ) : (
                                <OstudButton
                                    key={menuItem.key}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'black', display: 'block'}}
                                    customcolor='black'
                                >
                                    {menuItem.label}
                                </OstudButton>
                            )
                        ))}
                    </Box>
                    {isAuth ? <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Детальна інформація">
                            <IconButton onClick={handleOpenUserMenu}
                                        sx={{p: 0}}>
                                <Avatar alt={user.firstName}
                                        src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {menuItemsSetting.map((menuItemSetting) => (
                                menuItemSetting.action ?
                                    (
                                        <MenuItem key={menuItemSetting.key}
                                                  onClick={menuItemSetting.action}>
                                            <Typography textAlign="center">{menuItemSetting.label}</Typography>
                                        </MenuItem>) :
                                    <MenuItem key={menuItemSetting.key}
                                              onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{menuItemSetting.label}</Typography>
                                    </MenuItem>
                            ))}
                        </Menu>
                    </Box> : <Box sx={{flexGrow: 0}}>
                        <OstudButton sx={{my: 2, display: 'block'}}
                                     customcolor='#ffd422'
                                     onClick={handleLoginClick}>Увійти
                        </OstudButton>
                    </Box>}
                </Toolbar>
            </Container>
            <Menu
                id="login-form"
                anchorEl={anchorElNav}
                open={loginFormOpen}
                onClose={handleLoginFormClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Formik initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}>
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit}>
                            <Box sx={{p: 2, maxWidth: '300px'}}>
                                <Typography variant="h6"
                                            gutterBottom>
                                    Ваші дані
                                </Typography>
                                <Field as={OstudTextField}
                                       label="Електронна пошта"
                                       variant="outlined"
                                       id="email"
                                       name="email"
                                       required
                                       fullWidth
                                       error={formikProps.touched.email && !!formikProps.errors.email}
                                       helperText={formikProps.touched.email && formikProps.errors.email}
                                />
                                <Field as={OstudTextField}
                                       label="Пароль"
                                       variant="outlined"
                                       type="password"
                                       id="password"
                                       name="password"
                                       required
                                       fullWidth
                                       error={formikProps.touched.email && !!formikProps.errors.password}
                                       helperText={formikProps.touched.email && formikProps.errors.password}
                                />
                                <Link to={'/sign-up'}>
                                    <Typography fontSize={12}
                                                mb={1}
                                                color={'#ffd422'}
                                                sx={{
                                                    textDecoration: 'underline',
                                                    '&:hover': {
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                    >Ще не маєте аккаунту?</Typography>
                                </Link>
                                <OstudButton variant="contained"
                                             type="submit"
                                             disabled={!formikProps.touched.email || !!formikProps.errors.email || !!formikProps.errors.password}
                                             onClick={() => {
                                                 handleLoginFormClose();
                                                 handleLogin()
                                             }}
                                             fullWidth>Увійти</OstudButton>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Menu>
        </AppBar>
    )
}