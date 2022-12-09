import React from 'react'
import {fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthHandler from '../../../src/components/AuthHandler';
import { Provider } from 'react-redux';
import { defaultStore } from '../../../src/redux';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
    defaultStore.dispatch({
        type: 'auth/status/initial',
    });
    defaultStore.dispatch({
        type: 'auth/data/clear',
    });
  });
  
test('Renders main page', () => {
    render(
        <Provider store={defaultStore}>
            <AuthHandler />
        </Provider>
      );
  const linkElement = screen.getAllByText(/Welcome To/i);
  expect(linkElement[0]).toBeInTheDocument();
});


test('Login Test', () => {
    render(
        <Provider store={defaultStore}>
            <AuthHandler />
        </Provider>
      );
    const login = screen.getByTestId("login");
    fireEvent.click(login);
    const linkElement = screen.getAllByText(/Back/i);
    expect(linkElement[0]).toBeInTheDocument();
    const loginSubmit = screen.getByTestId("loginSubmit");
    fireEvent.click(loginSubmit);
    const linkElement2 = screen.getAllByText(/Home/i);
    expect(linkElement2[0]).toBeInTheDocument();
});
    
test('Register Test', () => {
    render(
        <Provider store={defaultStore}>
            <AuthHandler />
        </Provider>
      );
    const register = screen.getByTestId("register");
    fireEvent.click(register);
    const linkElement = screen.getAllByText(/Back/i);
    expect(linkElement[0]).toBeInTheDocument();
    const regitsterSubmit = screen.getByTestId("registerSubmit");
    fireEvent.click(regitsterSubmit);
    const linkElement2 = screen.getAllByText(/Home/i);
    expect(linkElement2[0]).toBeInTheDocument();
});