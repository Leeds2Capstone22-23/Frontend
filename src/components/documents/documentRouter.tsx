import React from 'react';
import { Route, Routes } from 'react-router';
import Page404 from '../Page404';
import DocumentBrowser from './documentBrowser';

export default function LabelRouter() {
  return (
    <>
      {/* labels router */}
      <Routes>
        <Route path='/' element={<DocumentBrowser />} />
        <Route path="/:labelID" element={<h1>yo</h1>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
