import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './AppBar.css';
import { AuthData } from '../redux/hooks/authHook';
import { useDispatch } from 'react-redux';
import { authInitial, clearAuth } from '../redux/reducers/authReducer';

const pages = ['Documents', 'Tags'];

function ResponsiveAppBar() {
    const userData = AuthData();
    const dispatch = useDispatch();
    return (
        <AppBar position="static">
            <Container
                sx = {{
                ml: 0,
                }}
            >
                <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to={'/'}
                    sx={{
                    mr: 2,
                    display: 'flex',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    HOME
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        component={Link}
                        to={`/${page}`}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "end" }}>
                    <h3>Hi {userData.username}</h3>
                    <Button
                        sx= {{ color: 'white'}}
                        onClick={() => {
                            dispatch(clearAuth());
                            dispatch(authInitial());
                        }}
                    >
                        Log Out
                    </Button>
                </Box>
                </Toolbar>
            </Container>
            </AppBar>
    );
}
export default ResponsiveAppBar;
