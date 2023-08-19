import React, {useState} from "react";
import {Link} from "react-router-dom"
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {OstudIcon} from "../../../shared/ui/icon";
import {OstudTextField} from "../../../shared/ui/textfield";
import {OstudButton} from "../../../shared/ui/button";

// TODO: decide how store the custom color

export function Navbar() {
    const menuItems = [
        {key: 'news', label: 'Новини', to: "/news"},
        {key: 'students', label: 'Учням'},
        {key: 'teachers', label: 'Вчителям'},
        {key: 'faq', label: 'FAQ', to: "/faq"},
    ]

    const menuItemsSetting = [
        {key: 'profile', label: 'Профіль',},
        {key: 'setting', label: 'Налаштування'},
        {
            key: 'sign out', label: 'Вийти', action: () => {
                handleLogin();
                handleCloseUserMenu();
            }
        },
    ];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogin = () => setLogin(!login);

    const [login, setLogin] = useState(false);

    const [loginFormOpen, setLoginFormOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = () => {
        setLoginFormOpen(true);
        handleCloseNavMenu();
    };

    const handleLoginFormClose = () => {
        setLoginFormOpen(false);
        setEmail("");
        setPassword("");
    };

    return (
        <AppBar position="static"
                color="inherit"
                style={{fontFamily: 'Coolvetica'}}>
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
                                        customColor='black'
                                    >
                                        {menuItem.label}
                                    </OstudButton>
                                </Link>
                            ) : (
                                <OstudButton
                                    key={menuItem.key}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'black', display: 'block'}}
                                    customColor='black'
                                >
                                    {menuItem.label}
                                </OstudButton>
                            )
                        ))}
                    </Box>
                    {login ? <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Детальна інформація">
                            <IconButton onClick={handleOpenUserMenu}
                                        sx={{p: 0}}>
                                <Avatar alt="User_avatar"
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
                                     customColor='#ffd422'
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
                <Box sx={{p: 2, maxWidth: '300px'}}>
                    <Typography variant="h6"
                                gutterBottom>
                        Ваші дані
                    </Typography>
                    <OstudTextField
                        label="Електронна пошта"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <OstudTextField
                        label="Пароль"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                                 onClick={() => {
                                     handleLoginFormClose();
                                     handleLogin()
                                 }}
                                 fullWidth>Увійти</OstudButton>
                </Box>
            </Menu>
        </AppBar>
    )
}