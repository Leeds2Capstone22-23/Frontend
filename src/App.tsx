import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Page404 from './components/Page404';
import LabelRouter from './components/labels/labelRouter';
import Home from './components/Home';
import Account from './components/Account';
import DocumentRouter from './components/documents/documentRouter';
import SnippetRouter from './components/snippets/snippetRouter';
import QuickAdd from './components/QuickAdd';

export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar>
                {/* MAIN ROUTER */}
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<h1>Search</h1>} />
                <Route path="/documents/*" element={<DocumentRouter />} />
                <Route path="/snippets/*" element={<SnippetRouter />} />
                <Route path="/labels/*" element={<LabelRouter />} />
                <Route path="/settings" element={<h1>Settings</h1>} />
                <Route path="/account" element={<Account />} />
                <Route path="/add" element={<QuickAdd />} />
                <Route path="*" element={<Page404 />} />
                </Routes>
            </NavBar>
        </BrowserRouter>
    </div>
  );
}
