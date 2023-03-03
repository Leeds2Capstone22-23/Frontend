import {
  Modal, Fade, Box, Typography, TextField, Button, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import React, { useState } from 'react';
import { createNewLabel } from '../../logic/apiRequest';
import { colors } from '../../styling/Colors';
import { LabelData } from '../../redux/hooks/labelHook';

interface LabelCreationProps {
  showModal: boolean,
  setShowModal: Function,
  setRefreshDocs: Function,
}

export default function LabelCreation(props: LabelCreationProps) {
  // ** STATE **
  const [labelTitle, setLabelTitle] = useState('');
  const [labelColor, setLabelColor] = useState(-1);
  const [labelInvalid, setLabelInvalid] = useState(true);

  const labelData = LabelData();

  const handleClose = () => props.setShowModal(false);
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newColor: string,
  ) => {
    if (newColor !== null) {
      setLabelColor(Number(newColor));
      if (labelTitle != '' && Number(newColor) > -1) {
        setLabelInvalid(false);
      }
    }
  };
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
          Create Label
        </Typography>
        <div style={{ height: '5vh' }} />
        <TextField
        fullWidth
        label="Title"
        id="fullWidth"
        value={labelTitle}
        onChange={(event) => {
          setLabelTitle(event.target.value);
          if (event.target.value != '' && labelColor > -1) {
            setLabelInvalid(false);
          } else {
            setLabelInvalid(true);
          }
        }}
        />
        <div style={{ height: '2vh' }} />
        <Typography id="title" variant="h6" style={{ textAlign: 'left', padding: '15px' }}>
          Select Color:
        </Typography>

        <ToggleButtonGroup
          size="small"
          aria-label="Select Color"
          value = {labelColor}
          onChange = {handleChange}
          exclusive
          fullWidth
        >

        {colors.filter((curr) => (
          !labelData.map((currLabel) => (currLabel.color)).includes(curr.id)))
          .map((currColor) => (
            <ToggleButton value={currColor.id} key={currColor.id}>
            <LabelIcon sx={{
              color: currColor,
              verticalAlign: 'middle',
              display: 'inline-block',
            }}
            />
            </ToggleButton>
          ))
          }
      </ToggleButtonGroup>
        <div style={{ marginTop: '40px', textAlign: 'center', minHeight: '' }}>
        <Button
          variant="outlined"
          disabled={labelInvalid}
          onClick={() => {
            createNewLabel(
              () => {},
              {
                title: labelTitle,
                color: labelColor,
              },
              props.setRefreshDocs,
            );
            setLabelColor(-1);
            setLabelTitle('');
            setLabelInvalid(true);
            props.setShowModal(false);
          }}
        >Create Label</Button>
      </div>
      </Box>
    </Fade>
  </Modal>
  </>
  );
}
