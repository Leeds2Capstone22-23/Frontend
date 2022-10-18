import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppBar from './components/AppBar';
import HomePage from './components/HomePage';
import TagPage from './components/TagPage';
import DocumentPage from './components/DocumentPage';
import Page404 from './components/Page404';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
        <AppBar />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/Tags" element={<TagPage />}/>
            <Route path="/Documents" element={<DocumentPage />}/>
            <Route path="*" element={<Page404 />}/>
        </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
