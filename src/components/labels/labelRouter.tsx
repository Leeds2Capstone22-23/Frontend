import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import Page404 from '../Page404';
import LabelView from './labelView';
import Labels from './labelBrowser';

export default function LabelRouter() {
  return (
    <>
      {/* labels router */}
      <Routes>
        <Route path='/' element={<Labels />} />
        <Route path="/:labelID" element={<LabelView />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
