import React from 'react';
import { Route, Routes } from 'react-router';
import Page404 from '../Page404';
import SnippetBrowser from './snippetBrowser';
import SnippetView from './snippetView';

export default function SnippetRouter() {
  return (
    <>
      {/* snippets router */}
      <Routes>
        <Route path='/' element={<SnippetBrowser />} />
        <Route path="/:snippetID" element={<SnippetView />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
