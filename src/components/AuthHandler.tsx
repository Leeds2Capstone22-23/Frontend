import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import App from '../App';
import { checkUserRegistration, registerNewUser } from '../logic/apiRequest';
import { AuthStatus } from '../redux/hooks/authHook';
import { newUserLogin, newUserRegistration, Status } from '../types/types';


export default function AuthHandler() {
    // ** REDUX ** 
    const dispatch = useDispatch();
    const authStatus = AuthStatus();

    // ** STATE **
    const [authType, setAuthType] = useState('none');
    const [registerNewUserData, setRegisterNewUserData] = useState<newUserRegistration>({
        firstName: '',
        lastName: '',
        userName: '',
        password: '', 
    });
    const [loginNewUserData, setLoginNewUserData] = useState<newUserLogin>({
        userName: '',
        password: '', 
    });
    const [error, setError] = useState(false);

    let authContent;

    // Show Registration or Login Page depending on selection
    if (authType === 'none') {
        authContent = (
            <>
            <DialogTitle
                        sx={{textAlign: 'center'}}
                    >
                        Welcome to Tag 'n Bag!
                    </DialogTitle>
                    <DialogContent
                        sx={{ 
                            minWidth: '500px',
                            textAlign: 'center'
                        }}
                    >
                    <DialogContentText
                    >
                        Please register or login to continue
                    </DialogContentText>
                    <br/>
                    <br/>
                    <Button
                        onClick={() => {
                            setAuthType('register')
                        }}
                    >
                        Register
                    </Button>
                    <Button
                        onClick={() => {
                            setAuthType('login')
                        }}
                    >
                        Login
                    </Button>
                </DialogContent>
            </>
        );
    } else if (authType === 'register') {
        authContent = (
            <>
                <DialogTitle
                        sx={{textAlign: 'center'}}
                    >
                        Register
                    </DialogTitle>
                    <DialogContent
                        sx={{ 
                            minWidth: '500px',
                        }}
                    >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        variant="outlined"
                        fullWidth
                        onChange={(event) => {
                            setRegisterNewUserData({
                                ...registerNewUserData,
                                userName: event.target.value,
                            });
                            }}
                        value={registerNewUserData.userName}
                    />
                    <br/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        error={error}
                        fullWidth
                        onChange={(event) => {
                            setRegisterNewUserData({
                                ...registerNewUserData,
                                password: event.target.value,
                            });
                            }}
                        value={registerNewUserData.password}
                    />
                    <br/>
                    <br/>
                    <Button
                        onClick={() => {
                            setAuthType('none')
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => {
                            //Register the new user
                            registerNewUser(registerNewUserData, dispatch)
                                .then(() => {
                                    setRegisterNewUserData({
                                        firstName: '',
                                        lastName: '',
                                        userName: '',
                                        password: '', 
                                    });
                                    setAuthType('none');
                                    setError(false);
                                })
                                
                        }}
                        variant="contained"
                        sx={{ 
                            textAlign: 'center',
                            margin: 'auto',
                            float: 'right',
                        }}
                    >
                        Register
                    </Button>
                </DialogContent>
            </>
        );
    } else if (authType === 'login') {
        authContent = (
            <>
                <DialogTitle
                        sx={{textAlign: 'center'}}
                    >
                        Login
                    </DialogTitle>
                    <DialogContent
                        sx={{ 
                            minWidth: '500px',
                        }}
                    >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        variant="outlined"
                        fullWidth
                        onChange={(event) => {
                            setLoginNewUserData({
                                ...loginNewUserData,
                                userName: event.target.value,
                            });
                            }}
                        value={loginNewUserData.userName}
                    />
                    <br/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        error={error}
                        onChange={(event) => {
                            setLoginNewUserData({
                                ...loginNewUserData,
                                password: event.target.value,
                            });
                            }}
                        value={loginNewUserData.password}
                    />
                    <br/>
                    <br/>
                    <Button
                        onClick={() => {
                            setAuthType('none')
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => {
                            //Register the new user
                            checkUserRegistration(loginNewUserData, dispatch)
                                .then(() => {
                                    setLoginNewUserData({
                                        userName: '',
                                        password: '', 
                                    });
                                    setAuthType('none');
                                    setError(false);
                                })
                                .catch(() => {
                                    setError(true);
                                });
                        }}
                        variant="contained"
                        sx={{ 
                            textAlign: 'center',
                            margin: 'auto',
                            float: 'right',
                        }}
                    >
                        Register
                    </Button>
                </DialogContent>
            </>
        );
    }



    if (authStatus === Status.Succeeded) {
        return (
        <App />
        );
    } else {
        return (
            <div>
                <Dialog 
                    open={true}
                    onClose={() => {}}
                >
                    
                        {authContent}
                </Dialog>
            </div>
        )
    }
}