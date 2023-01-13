import React from 'react';
import { Route, Routes } from 'react-router';
import Page404 from '../Page404';
import DocumentBrowser from './documentBrowser';
import DocumentView from './documentView';

export default function LabelRouter() {
  return (
    <>
      {/* labels router */}
      <Routes>
        <Route path='/' element={<DocumentBrowser />} />
        <Route path="/:documentID" element={<DocumentView />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
