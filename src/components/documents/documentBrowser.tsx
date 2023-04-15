import {
  Button, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import { DocData } from '../../redux/hooks/docHook';
import { Doc } from '../../types/types';
import redirect from '../../logic/routerRedirect';
import DocumentCreation from './documentCreation';
import DeleteConfirmation from '../deleteConfirmation';
import { deleteDocument } from '../../logic/apiRequest';

export default function DocumentBrowser() {
  const [docsFiltered, setDocsFiltered] = useState<Doc[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDocumentCreation, setShowDocumentCreation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [refreshDocs, setRefreshDocs] = useState(false);
  const [refreshSnippets, setRefreshSnippets] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteText, setDeleteText] = useState('TEMP');
  const [currentDoc, setCurrentDoc] = useState(-1);
  const navigate = useNavigate();

  const docsData = DocData(refreshDocs);

  useEffect(() => {
    if (refreshDocs) {
      setRefreshDocs(false);
    }

    if (refreshSnippets) {
      setRefreshSnippets(false);
    }

    if (deleteConfirmed && (currentDoc > -1)) {
      deleteDocument(currentDoc, () => {}, setRefreshDocs, setRefreshSnippets);
      setDeleteConfirmed(false);
    }
  }, [deleteConfirmed, refreshSnippets, refreshDocs]);

  /**
   * Handles searching for filtering documents
   * @param newSearchQuery the string of the search
   */
  function searchObjects(newSearchQuery:string) {
    setSearchQuery(newSearchQuery);
    if (newSearchQuery === '') {
      setDocsFiltered(docsData);
    } else {
      setDocsFiltered(
        new Fuse(docsData, {
          threshold: 0.3,
          keys: [
            'title',
            'time_added',
            {
              name: 'content',
              weight: 0.2,
            },
          ],
        })
          .search(newSearchQuery)
          .map((element) => element.item) as any,
      );
    }
  }
  useEffect(() => {
    setDocsFiltered(docsData);
  }, [docsData]);

  return (
    <>
    <DeleteConfirmation
      showModal={showDeleteConfirmation}
      setShowModal={setShowDeleteConfirmation}
      setResponse={setDeleteConfirmed}
      itemString={deleteText}
      />
    <DocumentCreation
      showModal={showDocumentCreation}
      setShowModal={setShowDocumentCreation}
      setRefreshDocs={setRefreshDocs}
      />
    <div style={{
      maxWidth: '1000px',
      margin: 'auto',
    }}>
      <Typography variant="h2" textAlign="center">
          Documents
      </Typography>
        <TextField
          id="outlined-basic"
          aria-label="Search"
          onChange={ (event) => searchObjects(event.target.value)}
          value={searchQuery}
          label={
            <>
              <SearchIcon/>
            </>
        }
          variant="filled"
          style={{ width: '100%', backgroundColor: '#0f0f17' }}
        />
        <div
          style={{
            maxHeight: '70vh',
            minHeight: '0px',
            overflowY: 'scroll',
            paddingTop: '20px',
          }}
        >
        {
          docsFiltered.map((currDoc) => (
            <Box
              key={currDoc.id}
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
                  key={currDoc.id}
                  href={`/documents/${currDoc.id}`}
                  style= {{
                    height: '50px',
                    textTransform: 'none',
                  }}
                  onClick={(event) => {
                    redirect(event, `/documents/${currDoc.id}`, navigate);
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
                    {currDoc.title}
                  </Typography>
                </Button>
                <div
                style={{
                  textAlign: 'center',
                }}
                >
                  <Typography
                      variant="body1"
                      textAlign="right"
                      style={{
                        textAlign: 'center',
                        margin: 'auto',
                      }}
                  >Added {moment.parseZone(currDoc.time_added).local().format('MMM Do YYYY')}
                  </Typography>
                </div>
              </Card>

              <Button
                key={currDoc.id}
                onClick={() => {
                  setCurrentDoc(currDoc.id);
                  setDeleteText(`document "${currDoc.title}"`);
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
          ))}
        </div>
      </div>
      <div style={{ marginTop: '40px', textAlign: 'center', minHeight: '' }}>
        <Button
          variant="outlined"
          onClick={() => {
            setShowDocumentCreation(true);
          }}
        >Create Document</Button>
      </div>
    </>
  );
}
