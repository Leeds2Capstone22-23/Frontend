import {
  Modal, Fade, Box, Typography, TextField, Button,
} from '@mui/material';
import React, { useState } from 'react';
import { createNewDocument } from '../../logic/apiRequest';

interface DocumentCreationProps {
  showModal: boolean,
  setShowModal: Function,
  setRefreshDocs: Function,
}

export default function DocumentCreation(props: DocumentCreationProps) {
  // ** STATE **
  const [docTitle, setDocTitle] = useState('');
  const [docContent, setDocContent] = useState('');
  const [docInvalid, setDocInvalid] = useState(true);
  const handleClose = () => props.setShowModal(false);
  return (
    <>
    <Modal
    aria-labelledby="title"
    aria-describedby="transition-modal-description"
    open={props.showModal}
    onClose={handleClose}
  >
    <Fade in={props.showModal}>
      <Box
      style={{
        background: '#1c1b21',
        maxWidth: '1000px',
        margin: 'auto',
        marginTop: '10vh',
        marginBottom: '10vh',
        padding: '30px',
      }}
      >
        <Typography id="title" variant="h2" style={{ textAlign: 'center' }}>
          Create Document
        </Typography>
        <div style={{ height: '5vh' }} />
        <TextField
        fullWidth
        label="Title"
        id="fullWidth"
        value={docTitle}
        onChange={(event) => {
          setDocTitle(event.target.value);
          if (docContent != '' && event.target.value != '') {
            setDocInvalid(false);
          } else {
            setDocInvalid(true);
          }
        }}
        />
        <div style={{ height: '2vh' }} />
        <TextField
            minRows={14}
            maxRows={(window.innerHeight / 16) * 0.30}
            fullWidth
            multiline
            label="Content"
            id="fullWidth"
            value={docContent}
            onChange={(event) => {
              setDocContent(event.target.value);
              if (event.target.value != '' && docTitle != '') {
                setDocInvalid(false);
              } else {
                setDocInvalid(true);
              }
            }}
        />
              <div style={{ marginTop: '40px', textAlign: 'center', minHeight: '' }}>
        <Button
          variant="outlined"
          disabled={docInvalid}
          onClick={() => {
            createNewDocument(
              () => {},
              {
                title: docTitle,
                content: docContent,
              },
              props.setRefreshDocs,
            );
            setDocTitle('');
            setDocContent('');
            setDocInvalid(true);
            props.setShowModal(false);
          }}
        >Create Document</Button>
      </div>
      </Box>
    </Fade>
  </Modal>
  </>
  );
}
