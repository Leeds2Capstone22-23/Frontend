import {
  Box,
  Button,
  Card,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import redirect from '../../logic/routerRedirect';
import { deleteSnippet } from '../../logic/apiRequest';
import { SnippetData } from '../../redux/hooks/snippetHook';
import DeleteConfirmation from '../deleteConfirmation';

export default function LabelBrowser() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [refreshLabels, setRefreshLabels] = useState(false);
  const [refreshSnippets, setRefreshSnippets] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteText, setDeleteText] = useState('TEMP');
  const [currentSnippet, setCurrentSnippet] = useState(-1);

  const snippetData = SnippetData(refreshSnippets);
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshLabels) {
      setRefreshLabels(false);
    }

    if (refreshSnippets) {
      setRefreshSnippets(false);
    }

    if (deleteConfirmed && (currentSnippet > -1)) {
      deleteSnippet(currentSnippet, () => {}, setRefreshSnippets);
      setDeleteConfirmed(false);
    }
  }, [refreshLabels, refreshSnippets, deleteConfirmed]);

  return (
    <>
    <DeleteConfirmation
      showModal={showDeleteConfirmation}
      setShowModal={setShowDeleteConfirmation}
      setResponse={setDeleteConfirmed}
      itemString={deleteText}
    />
    <Typography variant="h2" textAlign="center">
    Snippets
    </Typography>
    <div
      style={{
        maxHeight: '80vh',
        minHeight: '0px',
        overflowY: 'scroll',
        maxWidth: '1000px',
        margin: 'auto',
        paddingTop: '20px',
      }}
    >
    {
      snippetData.map((currSnip) => (
        <Box
          key={currSnip.id}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Card
            style={{
              marginTop: '5px',
              marginRight: '10px',
              padding: '15px',
              display: 'inline-flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
            }}
          >
            <Button
              key={currSnip.id}
              href={`/snippets/${currSnip.id}`}
              style= {{
                height: '50px',
                textTransform: 'none',
              }}
              onClick={(event) => {
                redirect(event, `/snippets/${currSnip.id}`, navigate);
              }}
            >
              <Typography
                variant="h5"
                textAlign="left"
                style={{
                  verticalAlign: 'middle',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                >
                {currSnip.char_offset}
              </Typography>
            </Button>
            <div
            style={{
              textAlign: 'center',
            }}
            >
            </div>
          </Card>

          <Button
            key={currSnip.id}
            onClick={() => {
              setCurrentSnippet(currSnip.id);
              setDeleteText(`snippet "${currSnip.id}"`);
              setShowDeleteConfirmation(true);
            }}
          >
            <DeleteIcon
              className='deleteButton'
              sx={{
                fontSize: '50px',
                verticalAlign: 'middle',
                display: 'inline-block',
              }}
            />

          </Button>
        </Box>
      ))
    }
    </div>
    </>
  );
}
