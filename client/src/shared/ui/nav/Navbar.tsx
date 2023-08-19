import React, {useState} from "react";
import {Link} from "react-router-dom"
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {OstudIcon} from "../icon";

export function Navbar() {
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
                        <Link to="/news"
                              style={{textDecoration: 'none', color: 'inherit'}}>
                            <Button
                                key='news'
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'black', display: 'block'}}
                            >
                                Новини
                            </Button>
                        </Link>
                        <Button
                            key='students'
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'black', display: 'block'}}
                        >
                            Учням
                        </Button>
                        <Button
                            key='teachers'
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'black', display: 'block'}}
                        >
                            Вчителям
                        </Button>
                        <Link to="/faq"
                              style={{textDecoration: 'none', color: 'inherit'}}>
                            <Button
                                key='faq'
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'black', display: 'block'}}
                            >
                                FAQ
                            </Button>
                        </Link>
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
                            <MenuItem key={'Профіль'} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Профіль</Typography>
                            </MenuItem>
                            <MenuItem key={'Налаштування'} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Налаштування</Typography>
                            </MenuItem>
                            <MenuItem key={'Вийти'}
                                      onClick={() => {handleLogin(); handleCloseUserMenu();}}>
                                <Typography textAlign="center">Вийти</Typography>
                            </MenuItem>
                        </Menu>
                    </Box> : <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Увійдіть до свого аккаунту">
                            <Button sx={{my: 2, color: '#FFD422', display: 'block'}}
                                    onClick={handleLogin}>Увійти</Button>
                        </Tooltip>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    )
}