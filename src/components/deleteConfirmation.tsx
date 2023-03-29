import {
  Modal, Fade, Box, Typography, Button, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

interface DeleteConfirmationProps {
  showModal: boolean,
  setShowModal: Function,
  setResponse: Function,
  itemString: String,
}

export default function DeleteConfirmation(props: DeleteConfirmationProps) {
  const handleClose = () => props.setShowModal(false);

  const item = (props.itemString.length > 40) ? props.itemString.slice(0, 39).concat('..."') : props.itemString;

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
        maxWidth: '500px',
        margin: 'auto',
        marginTop: '10vh',
        marginBottom: '10vh',
        padding: '30px',
      }}>
        <div style={{ textAlign: 'right' }}>
          <IconButton
            color="primary"
            aria-label="Close delete confirmation"
            onClick={() => {
              props.setResponse(false);
              props.setShowModal(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      <Typography id="title" variant="h4" style={{ textAlign: 'center' }}>
        Are you sure you want to delete {item}?
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
          variant="outlined"
          onClick={() => {
            props.setResponse(true);
            props.setShowModal(false);
          }}
          >Yes, Delete</Button>
        <Button
          variant='contained'
          onClick={() => {
            props.setResponse(false);
            props.setShowModal(false);
          }}
          >No, Cancel</Button>
      </div>
    </Box>
    </Fade>
  </Modal>
  </>
  );
}
