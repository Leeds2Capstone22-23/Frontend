import {
  Box, Typography, Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DocData } from '../redux/hooks/docHook';
import { LabelData } from '../redux/hooks/labelHook';

import DocumentCreation from './documents/documentCreation';
import LabelCreation from './labels/labelCreation';

export default function QuickAdd() {
  const [showDocumentCreation, setShowDocumentCreation] = useState(false);
  const [showLabelCreation, setShowLabelCreation] = useState(false);
  const [refreshDocs, setRefreshDocs] = useState(false);
  const [refreshLabels, setRefreshLabels] = useState(false);

  // need these here so data gets updated immediately
  // eslint-disable-next-line
  const docsData = DocData(refreshDocs);
  // eslint-disable-next-line
  const labelData = LabelData(refreshLabels);

  useEffect(() => {
    if (refreshDocs) {
      setRefreshDocs(false);
    }
  }, [refreshDocs]);

  useEffect(() => {
    if (refreshLabels) {
      setRefreshLabels(false);
    }
  }, [refreshLabels]);

  return (
    <>
    <DocumentCreation
      showModal={showDocumentCreation}
      setShowModal={setShowDocumentCreation}
      setRefreshDocs={setRefreshDocs}
      />
    <LabelCreation
      showModal={showLabelCreation}
      setShowModal={setShowLabelCreation}
      setRefreshDocs={setRefreshLabels}
      />

    <Box
      style={{
        background: '#1c1b21',
        maxWidth: '500px',
        margin: 'auto',
        marginTop: '10vh',
        marginBottom: '10vh',
        padding: '30px',
      }}>
      <Typography id="title" variant="h4" style={{ textAlign: 'center' }}>
        Add item
      </Typography>
      <Typography id="title" variant="body2" style={{ textAlign: 'center' }}>
        Snippets can be added by highlighting text within a document.
      </Typography>

      <div style={{
        marginTop: '40px',
        marginLeft: '15%',
        marginRight: '15%',
        textAlign: 'center',
        minHeight: '',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Button
          variant="contained"
          sx={{ width: '20vh', marginRight: '10px' }}
          onClick={() => {
            setShowDocumentCreation(true);
          }}
          >Document</Button>
        <Button
          variant='contained'
          sx={{ width: '20vh', marginLeft: '10px' }}
          onClick={() => {
            setShowLabelCreation(true);
          }}
          >Label</Button>
      </div>
    </Box>
  </>
  );
}
