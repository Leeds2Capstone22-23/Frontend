import React from 'react';
import { Route, Routes } from 'react-router';
import Page404 from '../Page404';
import SnippetBrowser from './snippetBrowser';

export default function LabelRouter() {
  return (
    <>
      {/* labels router */}
      <Routes>
        <Route path='/' element={<SnippetBrowser />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
