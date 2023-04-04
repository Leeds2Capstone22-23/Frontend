import {
  Box, Button, Card, Stack, TextField, Tooltip, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import LabelIcon from '@mui/icons-material/Label';
import SearchIcon from '@mui/icons-material/Search';
import Fuse from 'fuse.js';
import { LabelData } from '../../redux/hooks/labelHook';
import { colors } from '../../styling/Colors';
import Page404 from '../Page404';
import DeleteConfirmation from '../deleteConfirmation';
import { SnippetData } from '../../redux/hooks/snippetHook';
import { DocData } from '../../redux/hooks/docHook';
import redirect from '../../logic/routerRedirect';
import { deleteSnippet } from '../../logic/apiRequest';

export default function LabelView() {
  const [snippetsFiltered, setSnippetsFiltered] = useState<SnippetDisplay[]>([]);
  const [snippetsData, setSnippetsData] = useState<SnippetDisplay[]>([]);
  const [currentSnippet, setCurrentSnippet] = useState(-1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [refreshSnippets, setRefreshSnippets] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteText, setDeleteText] = useState('TEMP');
  const [searchQuery, setSearchQuery] = useState('');
  const { labelID } = useParams();
  const labelData = LabelData();
  const snippetData = SnippetData(refreshSnippets);
  const docData = DocData();
  const navigate = useNavigate();

  const currLabel = labelData.find((searchLabel) => (searchLabel.id === Number(labelID)));

  interface SnippetDisplay {
    id: number,
    labelID: number,
    labelColor: number,
    labelName: string,
    text: string,
    documentID: number,
    documentTitle: string,
  }

  function generateSnippets():SnippetDisplay[] {
    const labelSnippets = snippetData.filter(
      (searchSnippet) => (searchSnippet.label_id === currLabel!.id),
    );

    const storage:SnippetDisplay[] = [];

    labelSnippets.forEach((currSnippet) => {
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
  }, [snippetData, docData, labelData, labelID]);

  useEffect(() => {
    if (refreshSnippets) {
      setRefreshSnippets(false);
    }

    if (deleteConfirmed && (currentSnippet > -1)) {
      deleteSnippet(currentSnippet, () => {}, setRefreshSnippets);
      setDeleteConfirmed(false);
    }
  }, [refreshSnippets, deleteConfirmed]);

  if (currLabel) {
    return (
      <>
      <DeleteConfirmation
        showModal={showDeleteConfirmation}
        setShowModal={setShowDeleteConfirmation}
        setResponse={setDeleteConfirmed}
        itemString={deleteText}
      />

      {/* HEADER */}
      <div style={{
        maxWidth: '1000px',
        margin: 'auto',
      }}>
        <LabelIcon
          sx={{
            color:
            (currLabel.color >= 0 && currLabel.color < colors.length)
              ? colors[currLabel.color].color
              : '',
            fontSize: '50px',
            verticalAlign: 'middle',
            display: 'inline-block',
            marginRight: '10px',
          }}
        />
        <Typography
          variant="h2"
          textAlign="left"
          style={{
            verticalAlign: 'middle',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '90%',
          }}
          >
            {currLabel.name}
          </Typography>

        {/* BODY */}
        <TextField
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
          // HERE
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
                      style={{
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
                        }}
                        >
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
                              maxWidth: '75%',
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
                        }}
                        >
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
                              maxWidth: '75%',
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
                  <div style={{
                    maxWidth: '85%',
                    textAlign: 'left',
                  }}>
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
            ))}
        </div>
      </div>
    </>
    );
  }
  return <Page404 />;
}
