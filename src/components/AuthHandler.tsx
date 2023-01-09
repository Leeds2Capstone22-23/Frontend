import {
  Alert, Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@mui/material';
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
  const [errorMessage, setErrorMessage] = useState('');

  let authContent;

  // Show Registration or Login Page depending on selection
  if (authType === 'none') {
    authContent = (
      <>
        <DialogTitle
          sx={{ textAlign: 'center' }}
        >
          Welcome to Tag 'n Bag!
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: '500px',
            textAlign: 'center',
          }}
        >
          <DialogContentText>
            Your research hub
          </DialogContentText>
          <br />
          <br />
          <br />
          <br />
          <DialogContentText>
            Please register or login to continue
          </DialogContentText>
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
        onClose={() => {}}
      >

        {authContent}
      </Dialog>
    </div>
  );
}
