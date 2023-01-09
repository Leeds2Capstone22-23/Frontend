import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { createNewDoc } from '../logic/apiRequest';
import { Doc, Status } from '../types/types';
import { DocData, DocStatus } from '../redux/hooks/docHook';

export default function UploadDoc() {
  // ** STATE **
  const [refreshDocs, setRefreshDocs] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docContent, setDocContent] = useState('');
  const [docCreationStatus, setDocCreationStatus] = useState(Status.Initial);

  // ** REDUX **
  const docStatus:Status = DocStatus();
  const docData:Doc[] = DocData(refreshDocs);

  let docList;
  if (docStatus === Status.Initial) {
    docList = (<h1>Haven't Requested Data Yet</h1>);
  } else if (docStatus === Status.Loading) {
    docList = (<CircularProgress />);
  } else if (docStatus === Status.Succeeded) {
    docList = (
      docData.map((doc:any) => (
        <p key={doc.id}>
          {doc.title}
          {' '}
          -
          {' '}
          {doc.content}
        </p>
      ))
    );
  } else {
    (
      docList = (
        <h1>An Error Occurred Loading Data</h1>
      )
    );
  }

  let docCreationContent;
  if (docCreationStatus === Status.Initial) {
    docCreationContent = (
      <>
        <TextField
          label="Name"
          variant="outlined"
          sx={{
            minWidth: '25vw',
          }}
          onChange={(event) => {
            setDocTitle(event.target.value);
          }}
          value={docTitle}
        />
        <br />
        <br />
        <TextField
          label="Content"
          variant="outlined"
          sx={{
            minWidth: '25vw',
          }}
          multiline
          rows={5}
          onChange={(event) => {
            setDocContent(event.target.value);
          }}
          value={docContent}
        />
        <br />
        <br />
        <Button
          onClick={() => {
            createNewDoc(setDocCreationStatus, docTitle, docContent).then(() => {
              setRefreshDocs(true);
            });
          }}
          variant="contained"
        >
          Create New Doc
        </Button>
      </>
    );
  } else if (docCreationStatus === Status.Loading) {
    docCreationContent = (<CircularProgress />);
  } else if (docCreationStatus === Status.Succeeded) {
    docCreationContent = (
      <h3>Added Document</h3>
    );
  } else {
    (
      docCreationContent = (
        <h3>An Error Occurred</h3>
      )
    );
  }

  return (
    <>
      <div className="UploadDoc">
        document upload area
      </div>
      {docCreationContent}
      <br />
      <br />
      <br />
      {docList}
    </>
  );
}
