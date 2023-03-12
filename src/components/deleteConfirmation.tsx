import {
  Modal, Fade, Box, Typography, Button,
} from '@mui/material';
import React from 'react';

interface DeleteConfirmationProps {
  showModal: boolean,
  setShowModal: Function,
  setResponse: Function,
  itemString: String,
}

export default function DeleteConfirmation(props: DeleteConfirmationProps) {
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
        maxWidth: '500px',
        margin: 'auto',
        marginTop: '10vh',
        marginBottom: '10vh',
        padding: '30px',
      }}>
      <Typography id="title" variant="h4" style={{ textAlign: 'center' }}>
        Are you sure you want to delete {props.itemString}?
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
