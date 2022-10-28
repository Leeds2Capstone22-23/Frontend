import { Button, CircularProgress, TextField } from '@mui/material';
import {createNewLabel, retrieveAllLabels} from '../logic/apiRequest'
import React, { useState } from 'react';
import { Status } from '../types/types';

export default function HomePage() {
    const [labelData, setLabelData] = useState([]);
    const [labelStatus, setLabelStatus] = useState(Status.Initial);

    const [labelName, setLabelName] = useState("");
    const [labelCreationStatus, setLabelCreationStatus] = useState(Status.Initial);

    let labelContent;

    if (labelStatus === Status.Initial) {
        labelContent = (<h1>Haven't Requested Data Yet</h1>)
    } else if (labelStatus === Status.Loading) {
        labelContent = (<CircularProgress />)
    } else if (labelStatus === Status.Succeeded) {
        labelContent = (
            labelData.map((label:any) => {
                return (<h3 key={label.id}>{label.name}</h3>)
            })
        )
    } else (
        labelContent = (
            <h1>An Error Occurred Loading Data</h1>
        )
    )

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
                <br/><br/>
                <Button
                onClick={() => {createNewLabel(setLabelCreationStatus, labelName)}}
                variant="contained"
                >
                    Create New Label
                </Button>
            </>
        )
    } else if (labelCreationStatus === Status.Loading) {
        labelCreationContent = (<CircularProgress />)
    } else if (labelCreationStatus === Status.Succeeded) {
        labelCreationContent = (
            <h3>Added Label</h3>
        )
    } else (
        labelCreationContent = (
            <h3>An Error Occurred</h3>
        )
    )


  return (
    <>
    <div className="HomeExample">
       Home Example
    </div>
    {labelCreationContent}<br /><br/><br/>
    <Button
    onClick={() => {retrieveAllLabels(setLabelStatus, setLabelData)}}
    variant="contained"
    >
        Load All Labels
    </Button>
    
    {labelContent}
    </>
  );
}
