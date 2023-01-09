import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { createNewLabel } from '../logic/apiRequest';
import { LabelData, LabelStatus } from '../redux/hooks/labelHook';
import { Label, Status } from '../types/types';
import UploadDoc from './UploadDoc';

export default function HomePage() {
  // ** STATE **
  const [refreshLabels, setRefreshLabels] = useState(false);
  const [labelName, setLabelName] = useState('');
  const [labelCreationStatus, setLabelCreationStatus] = useState(Status.Initial);

  // ** REDUX **
  const labelStatus:Status = LabelStatus();
  const labelData:Label[] = LabelData(refreshLabels);

  let labelContent;
  if (labelStatus === Status.Initial) {
    labelContent = (<h1>Haven't Requested Data Yet</h1>);
  } else if (labelStatus === Status.Loading) {
    labelContent = (<CircularProgress />);
  } else if (labelStatus === Status.Succeeded) {
    labelContent = (
      labelData.map((label:any) => (<h3 key={label.id}>{label.name}</h3>))
    );
  } else {
    (
      labelContent = (
        <h1>An Error Occurred Loading Data</h1>
      )
    );
  }

  let labelCreationContent;
  if (labelCreationStatus === Status.Initial) {
    labelCreationContent = (
      <>
        <TextField
          label="Name"
          variant="outlined"
          sx={{
            minWidth: '25vw',
          }}
          onChange={(event) => {
            setLabelName(event.target.value);
          }}
          value={labelName}
        />
        <br />
        <br />
        <Button
          onClick={() => {
            createNewLabel(setLabelCreationStatus, labelName).then(() => {
              setRefreshLabels(true);
            });
          }}
          variant="contained"
        >
          Create New Label
        </Button>
      </>
    );
  } else if (labelCreationStatus === Status.Loading) {
    labelCreationContent = (<CircularProgress />);
  } else if (labelCreationStatus === Status.Succeeded) {
    labelCreationContent = (
      <h3>Added Label</h3>
    );
  } else {
    (
      labelCreationContent = (
        <h3>An Error Occurred</h3>
      )
    );
  }

  return (
    <>
      <div className="HomeExample">
        Home Example
      </div>
      {labelCreationContent}
      <br />
      <br />
      <br />
      {labelContent}

      <br />
      <hr />
      <br />

      <UploadDoc />
    </>
  );
}
