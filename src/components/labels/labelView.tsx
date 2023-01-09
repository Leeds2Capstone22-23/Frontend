import React from 'react';
import { useParams } from 'react-router-dom';

export default function LabelView() {
  const { labelID } = useParams();
  return (
        <h1>{labelID}</h1>
  );
}
