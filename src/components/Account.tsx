import React from 'react';
import {
  Button, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthData } from '../redux/hooks/authHook';
import { logoutAction } from '../redux';
import routerRedirect from '../logic/routerRedirect';

export default function Account() {
  const dispatch = useDispatch();
  const authData = AuthData();
  const navigate = useNavigate();
  return (
    <>
        <Typography variant="h2" textAlign="center">
            Account
        </Typography>
        <div style={{ height: '20vh' }} />
        <Typography variant="h4" textAlign="center">
            {authData.username}
        </Typography>
        <div style={{
          textAlign: 'center',
        }}>
            <Button
                sx= {{
                  color: 'white', textAlign: 'center',
                }}
                onClick={(event) => {
                  routerRedirect(event, '/', navigate);
                  const date = new Date();
                  date.setDate(0);
                  document.cookie = `username=, secret=;expires=${date.toUTCString()};path=/;`;
                  dispatch(logoutAction());
                }}
            >
                <Typography variant="body2" textAlign="center">
                    Log Out
                </Typography>
            </Button>
        </div>
    </>
  );
}
