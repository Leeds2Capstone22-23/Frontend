import {
  Box,
  Button,
  Card,
  TextField,
  Tooltip,
  Typography,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelIcon from '@mui/icons-material/Label';
import DescriptionIcon from '@mui/icons-material/Description';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import redirect from '../../logic/routerRedirect';
import { colors } from '../../styling/Colors';
import { deleteSnippet } from '../../logic/apiRequest';
import { SnippetData } from '../../redux/hooks/snippetHook';
import { LabelData } from '../../redux/hooks/labelHook';
import { DocData } from '../../redux/hooks/docHook';
import DeleteConfirmation from '../deleteConfirmation';

export default function LabelBrowser() {
  const [snippetsFiltered, setSnippetsFiltered] = useState<SnippetDisplay[]>([]);
  const [snippetsData, setSnippetsData] = useState<SnippetDisplay[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [refreshLabels, setRefreshLabels] = useState(false);
  const [refreshSnippets, setRefreshSnippets] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteText, setDeleteText] = useState('TEMP');
  const [currentSnippet, setCurrentSnippet] = useState(-1);

  const labelData = LabelData();
  const docData = DocData();
  const snippetData = SnippetData(refreshSnippets);
  const navigate = useNavigate();

  interface SnippetDisplay {
    id: number,
    labelID: number,
    labelColor: number,
    labelName: string,
    text: string,
    documentID: number,
    documentTitle: string,
    jobName: string,
  }

  function generateSnippets():SnippetDisplay[] {
    const storage:SnippetDisplay[] = [];

    snippetData.forEach((currSnippet) => {
      const doc = docData.find((searchDoc) => (searchDoc.id === currSnippet.document_id));
      const label = labelData.find((searchLabel) => (searchLabel.id === currSnippet.label_id));
      if (doc) {
        const rawtext = doc.content.replaceAll('\n', '\n\n');
        const snippetContent = rawtext.substring(
          currSnippet.char_offset,
          currSnippet.char_offset + currSnippet.length,
        );

        storage.push({
          id: currSnippet.id,
          labelID: currSnippet.label_id,
          labelName: label.name,
          labelColor: label.color,
          text: snippetContent,
          documentID: doc.id,
          documentTitle: doc.title,
          jobName: currSnippet.jobName,
        });
      }
    });

    return storage;
  }

  /**
   * Handles searching for filtering documents
   * @param newSearchQuery the string of the search
   */
  function searchObjects(newSearchQuery:string) {
    setSearchQuery(newSearchQuery);
    if (newSearchQuery === '') {
      setSnippetsFiltered(snippetsData);
    } else {
      setSnippetsFiltered(
        new Fuse(snippetsData, {
          threshold: 0.3,
          ignoreLocation: true,
          keys: [
            'text',
            'documentTitle',
            'labelName',
          ],
        })
          .search(newSearchQuery)
          .map((element) => element.item),
      );
    }
  }

  useEffect(() => {
    setSnippetsData(generateSnippets());
    setSnippetsFiltered(generateSnippets());
  }, [snippetData, docData, labelData]);

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
    <div style={{
      maxWidth: '1000px',
      margin: 'auto',
    }}>
      <Typography variant="h2" textAlign="center">
      Snippets
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
          maxHeight: '80vh',
          minHeight: '0px',
          overflowY: 'scroll',
          paddingTop: '20px',
        }}
      >
      {
        snippetsFiltered.map((currSnip) => (
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
                alignItems: 'center',
                width: '90%',
              }}
            >
              <Tooltip key={currSnip.id} title={currSnip.documentTitle} placement='left' arrow>
                <Button
                  key={currSnip.id}
                  href={`/documents/${currSnip.documentID}`}

                  style= {{
                    height: '50px',
                    width: '15%',
                    textTransform: 'none',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    justifyContent: 'left',
                  }}
                  onClick={(event) => {
                    redirect(event, `/documents/${currSnip.documentID}`, navigate);
                  }}
                >
                  <Stack sx={{ width: '100%', justifyContent: 'left' }}>
                    <div style={{
                      height: '50%', width: '100%', whiteSpace: 'nowrap',
                    }}>
                      <DescriptionIcon
                        sx={{
                          fontSize: '20px',
                          verticalAlign: 'middle',
                          align: 'left',
                          marginRight: '10px',
                          display: 'inline-block',
                        }}
                      />
                      <Typography
                        variant="body2"
                        textAlign="left"
                        style={{
                          width: '75%',
                          verticalAlign: 'middle',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'inline-block',
                        }}
                        >
                        {currSnip.documentTitle}
                      </Typography>
                    </div>
                    <div style={{
                      height: '50%', width: '100%', whiteSpace: 'nowrap',
                    }}>
                      <LabelIcon
                        sx={{
                          color:
                          (currSnip.labelColor >= 0 && currSnip.labelColor < colors.length)
                            ? colors[currSnip.labelColor].color
                            : '',
                          fontSize: '20px',
                          verticalAlign: 'middle',
                          align: 'left',
                          marginRight: '10px',
                          display: 'inline-block',
                        }}
                      />
                      <Typography
                        variant="body1"
                        textAlign="left"
                        style={{
                          width: '75%',
                          verticalAlign: 'middle',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'inline-block',
                        }}
                        >
                        {currSnip.labelName}
                      </Typography>
                    </div>
                  </Stack>
                </Button>
              </Tooltip>
              <div
              style={{
                width: '80%',
                marginRight: '10px',
                textAlign: 'left',
              }}
                >
                  <Button
                  key={currSnip.id}
                  href={`/snippets/${currSnip.id}`}
                  style= {{
                    height: '50px',
                    textTransform: 'none',
                    maxWidth: '100%',
                  }}
                  onClick={(event) => {
                    redirect(event, `/snippets/${currSnip.id}`, navigate);
                  }}
                >
                  <Typography
                    variant="body1"
                    textAlign="left"
                    style={{
                      maxHeight: '50px',
                      whiteSpace: 'nowrap',
                      verticalAlign: 'middle',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    >
                    {currSnip.text}
                  </Typography>
                </Button>
              </div>
              <div>
                { currSnip.jobName ? <Tooltip title='Searched' placement='top'>
                  <TaskAltIcon
                    sx={{
                      color: 'green',
                      fontSize: '20px',
                      verticalAlign: 'middle',
                      marginRight: '10px',
                      display: 'inline-block',
                    }}
                  />
                </Tooltip>
                  : <Tooltip key={currSnip.id} title='Not yet searched' placement='top'>
                  <ErrorOutlineIcon
                    sx={{
                      color: 'white',
                      fontSize: '20px',
                      verticalAlign: 'middle',
                      marginRight: '10px',
                      display: 'inline-block',
                    }}
                  />
                </Tooltip>
              }
              </div>
            </Card>

            <Button
              key={currSnip.id}
              onClick={() => {
                setCurrentSnippet(currSnip.id);
                setDeleteText(`snippet "${currSnip.text}"`);
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
    </div>
    </>
  );
}
