import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import TagPage from './components/TagPage';
import DocumentPage from './components/DocumentPage';
import Page404 from './components/Page404';
import LabelRouter from './components/labels/labelRouter';

export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar>
                {/* MAIN ROUTER */}
                <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/search" element={<h1>Search</h1>} />
                <Route path="/documents" element={<h1>Documents</h1>} />
                <Route path="/snippets" element={<h1>Snippets</h1>} />
                <Route path="/label/*" element={<LabelRouter />} />
                <Route path="/settings" element={<h1>Settings</h1>} />
                <Route path="/account" element={<h1>Account</h1>} />
                <Route path="*" element={<Page404 />} />
                </Routes>
            </NavBar>
        </BrowserRouter>
    </div>
  );
}
