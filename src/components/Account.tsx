import React from 'react';
import {
  Button, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AuthData } from '../redux/hooks/authHook';
import { authInitial, clearAuth } from '../redux/reducers/authReducer';

export default function Account() {
  const dispatch = useDispatch();
  const authData = AuthData();
  return (
    <>
        <div style={{ height: '10vh' }} />
        <Typography variant="h2" textAlign="center">
            Account
        </Typography>
        <div style={{ height: '20vh' }} />
        <Typography variant="h4" textAlign="center">
            {authData.username}
        </Typography>
        <div style={{ height: '3vh' }} />
        <div style={{
          textAlign: 'center',
        }}>
            <Button
                sx= {{
                  color: 'white', textAlign: 'center', width: '10vw', height: '5vh',
                }}
                onClick={() => {
                  dispatch(clearAuth());
                  dispatch(authInitial());
                }}
            >
                <Typography variant="body1" textAlign="center">
                    Log Out
                </Typography>
            </Button>
        </div>
    </>
  );
}
