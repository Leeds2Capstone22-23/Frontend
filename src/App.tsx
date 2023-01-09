import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import TagPage from './components/TagPage';
import DocumentPage from './components/DocumentPage';
import Page404 from './components/Page404';

export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar>
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Tags" element={<TagPage />} />
                <Route path="/Documents" element={<DocumentPage />} />
                <Route path="*" element={<Page404 />} />
                </Routes>
            </NavBar>
        </BrowserRouter>
    </div>
  );
}
