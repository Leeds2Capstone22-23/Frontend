import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import Page404 from '../Page404';
import LabelView from './labelView';

export default function LabelRouter() {
  function Redirect() {
    return (<Navigate to={'/'} replace/>);
  }
  return (
    <>
      {/* labels router */}
      <Routes>
        <Route path='/' element={<Redirect/>} />
        <Route path="/:labelID" element={<LabelView />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
