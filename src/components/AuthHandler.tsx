import {
  Alert, Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { loginUser, nlpHelloWorld, registerNewUser } from '../logic/apiRequest';
import { AuthStatus } from '../redux/hooks/authHook';
import { newUserLogin, newUserRegistration, Status } from '../types/types';
import '../styling/main.css';
import NavBar from './NavBar';
import Home from './Home';

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
  const [errorMessage, setErrorMessage] = useState('');

  let authContent;

  nlpHelloWorld();

  // Show Registration or Login Page depending on selection
  if (authType === 'none') {
    if (authStatus !== Status.Loading) {
      authContent = (
        <>
          <div style={{ height: '20px' }} />
          <Typography variant="h2" textAlign="center">
              Welcome To SNPT
            </Typography>
          <DialogContent
            sx={{
              minWidth: '750px',
              textAlign: 'center',
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <Typography variant="h4" textAlign="center">
              Please Register or Login to continue
            </Typography>
            <br />
            <Button
              data-testid="register"
              onClick={() => {
                setAuthType('register');
              }}
            >
              Register
            </Button>
            <Button
              data-testid="login"
              onClick={() => {
                setAuthType('login');
              }}
            >
              Login
            </Button>
          </DialogContent>
        </>
      );
    } else {
      authContent = (
        <>
          <div style={{ height: '40px' }} />
          <Typography variant="h4" textAlign="center">
              Logging In...
            </Typography>
          <DialogContent
            sx={{
              minWidth: '750px',
              textAlign: 'center',
            }}
          >
            <div style={{ height: '40px' }} />
            <CircularProgress/>
            <div style={{ height: '40px' }} />

          </DialogContent>
        </>
      );
    }
  } else if (authType === 'register') {
    authContent = (
      <>
        <DialogTitle
          sx={{ textAlign: 'center' }}
        >
          Register
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: '500px',
          }}
        >
          {(error) ? (
            <>
              <Alert severity="error">{errorMessage}</Alert>
              <br />
            </>
          ) : (<></>)}
          <form>
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
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                setRegisterNewUserData({
                  ...registerNewUserData,
                  password: event.target.value,
                });
              }}
              value={registerNewUserData.password}
            />
            <br />
            <br />
            <Button
              onClick={() => {
                setAuthType('none');
                setError(false);
              }}
            >
              Back
            </Button>
            <Button
              data-testid="registerSubmit"
              onClick={(event) => {
                // Register the new user
                event.preventDefault();
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
                  .catch((err) => {
                    setErrorMessage(err.toString().replace('Error: ', ''));
                    setError(true);
                  });
              }}
              variant="contained"
              sx={{
                textAlign: 'center',
                margin: 'auto',
                float: 'right',
              }}
              type="submit"
            >
              Register
            </Button>
          </form>
        </DialogContent>
      </>
    );
  } else if (authType === 'login') {
    authContent = (
      <>
        <DialogTitle
          sx={{ textAlign: 'center' }}
        >
          Login
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: '500px',
          }}
        >
          {(error) ? (
            <>
              <Alert severity="error">{errorMessage}</Alert>
              <br />
            </>
          ) : (<></>)}
          <form>
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
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                setLoginNewUserData({
                  ...loginNewUserData,
                  password: event.target.value,
                });
              }}
              value={loginNewUserData.password}
            />
            <br />
            <br />
            <Button
              onClick={() => {
                setAuthType('none');
                setError(false);
              }}
            >
              Back
            </Button>
            <Button
              data-testid="loginSubmit"
              onClick={(event) => {
                // Login the user
                event.preventDefault();
                loginUser(loginNewUserData, dispatch)
                  .then(() => {
                    setLoginNewUserData({
                      userName: '',
                      password: '',
                    });
                    setAuthType('none');
                    setError(false);
                  })
                  .catch(() => {
                    setErrorMessage('Username or password incorrect. Please try again.');
                    setError(true);
                  });
              }}
              variant="contained"
              sx={{
                textAlign: 'center',
                margin: 'auto',
                float: 'right',
              }}
              type="submit"
            >
              Login
            </Button>
          </form>
        </DialogContent>
      </>
    );
  }

  if (authStatus === Status.Succeeded) {
    return (
      <App />
    );
  }
  return (
    <div>
      <Dialog
        open
        maxWidth='lg'
        onClose={() => {}}
      >

        {authContent}
      </Dialog>
      <div className='blur'>
        <BrowserRouter>
          <NavBar>
            <Home />
          </NavBar>
        </BrowserRouter>
      </div>
    </div>
  );
}
