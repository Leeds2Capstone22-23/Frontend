import {
  Button,
  Card,
  Typography,
  Stack,
  Tooltip,
  CircularProgress,
  IconButton,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LabelIcon from '@mui/icons-material/Label';
import DescriptionIcon from '@mui/icons-material/Description';
import AddBoxIcon from '@mui/icons-material/AddBox';
// import CheckBoxIcon from '@mui/icons-material/CheckBox'; // for future use
import { colors } from '../../styling/Colors';
import { DocData } from '../../redux/hooks/docHook';
import { LabelData } from '../../redux/hooks/labelHook';
import { SnippetData } from '../../redux/hooks/snippetHook';
import {
  addSnippetJob,
  createNewDocument,
  nlpSearch,
  retrieveJobResults,
} from '../../logic/apiRequest';
import { Status } from '../../types/types';

export default function SnippetView() {
  const { snippetID } = useParams();
  const [refreshSnippets, setRefreshSnippets] = useState(false);
  const [refreshDocs, setRefreshDocs] = useState(false);
  const [jobData, setJobData] = useState([]);

  // ** REDUX **
  const documentData = DocData(refreshDocs);
  const snippetData = SnippetData(refreshSnippets);
  const labelData = LabelData();

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

  const snip = snippetData.find((curr) => curr.id === Number(snippetID));
  const label = labelData.find((curr) => curr.id === snip.label_id);
  const doc = documentData.find((curr) => curr.id === snip.document_id);

  const currSnip: SnippetDisplay = {
    id: snip.id,
    labelID: snip.label_id,
    labelName: label.name,
    labelColor: label.color,
    text: doc.content.replaceAll('\n', '\n\n').substring(
      snip.char_offset,
      snip.char_offset + snip.length,
    ),
    documentID: doc.id,
    documentTitle: doc.title,
    jobName: snip.nlp_job_name,
  };

  const [snippetJob, setSnippetJob] = useState(currSnip.jobName);
  const [updateSnippet, setUpdateSnippet] = useState(false);
  const [snippetStatus, setSnippetStatus] = useState(Status.Initial);
  if (snippetJob && !jobData) {
    retrieveJobResults(snippetJob, setJobData);
  }

  function startSearch() {
    nlpSearch('SNPT search', currSnip.text, 'cuboulder,college', setSnippetJob, setUpdateSnippet);
  }

  function searchTitle(id: string) {
    return (documentData.find((curr) => curr.title === 'REDDIT_POST-'.concat(id)));
  }

  function savePost(result) {
    createNewDocument(
      () => {},
      {
        title: 'REDDIT_POST-'.concat(result.id),
        content: JSON.stringify(result),
      },
      setRefreshDocs,
    );
  }

  useEffect(() => {
    if (updateSnippet && snippetJob) {
      setUpdateSnippet(false);
      addSnippetJob(currSnip.id, snippetJob, setRefreshSnippets);
    }
  }, [updateSnippet]);

  useEffect(() => {
    if (refreshSnippets) {
      setRefreshSnippets(false);
      retrieveJobResults(snippetJob, setJobData);
    }
  }, [refreshSnippets]);

  useEffect(() => {
    if (refreshDocs) {
      setRefreshDocs(false);
    }
  }, [refreshDocs]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (snippetJob && jobData.length === 0) {
        retrieveJobResults(snippetJob, setJobData);
      } else {
        setSnippetStatus(Status.Succeeded);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [jobData, snippetJob, snippetStatus]);

  return (
    <>
    <div style={{
      maxWidth: '1000px',
      margin: 'auto',
    }}
    >
      <div
        style={{
          padding: '20px',
        }}
      >
        <Stack sx={{ width: '100%', justifyContent: 'left' }}>
          <div style={{
            height: '50%', width: '100%', whiteSpace: 'nowrap',
          }}>
            <DescriptionIcon
              sx={{
                fontSize: '50px',
                verticalAlign: 'middle',
                align: 'left',
                marginRight: '10px',
                display: 'inline-block',
              }}
            />
            <Typography
              variant="h3"
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
          }}>
            <LabelIcon
              sx={{
                color:
                (currSnip.labelColor >= 0 && currSnip.labelColor < colors.length)
                  ? colors[currSnip.labelColor].color
                  : '',
                fontSize: '50px',
                verticalAlign: 'middle',
                align: 'left',
                marginRight: '10px',
                display: 'inline-block',
              }}
            />
            <Typography
              variant="h3"
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

        <Card
        style={{
          padding: '3vw',
          whiteSpace: 'pre-line',
          maxWidth: '1000px',
          margin: 'auto',
        }}>
          { currSnip.text }
        </Card>

        <div style={{
          marginTop: '10px',
          marginLeft: '25%',
          marginRight: '25%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Button
            variant='outlined'
            style={{
              marginLeft: '10px',
              marginRight: '10px',
            }}
            onClick={() => {
              navigator.clipboard.writeText(String(currSnip.text));
            }}
          >
            Copy To Clipboard
          </Button>
          { currSnip.jobName ? <Button
            variant='outlined'
            style={{
              marginLeft: '10px',
              marginRight: '10px',
            }}
            disabled
          >
            Snippet Searched
          </Button>
            : <Button
              variant='outlined'
              style={{
                marginLeft: '10px',
                marginRight: '10px',
              }}
              onClick={() => {
                setSnippetStatus(Status.Loading);
                startSearch();
              }}
            >
              Find Similar with NLP
            </Button>
          }
        </div>
        {(snippetStatus === Status.Loading) ? (
          <div style={{
            textAlign: 'center',
            margin: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '15vh',
          }}>
              <Typography variant="h4" textAlign="center">
                  Searching Snippet
              </Typography>
              <div style={{ padding: '20px' }} />
              <CircularProgress/>
              <div style={{ padding: '20px' }} />
              <Typography variant="h4" textAlign="center">
                  This may take a minute.
              </Typography>
          </div>
        ) : (
          <>
        <div>
          {currSnip.jobName ? <Typography>{jobData.length} result(s)</Typography>
            : <></> }
        </div>
        <div
          style={{
            maxHeight: '80vh',
            minHeight: '0px',
            overflowY: 'scroll',
            paddingTop: '20px',
          }}
        >
          {
            jobData.map((result, index) => (
              <div key={ index }>
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
                  <Stack>
                    <Typography variant='body1' fontWeight='bold'>
                    <div
                        style={{
                          padding: '10px',
                        }}
                      >
                      <LinearProgress
                        variant="determinate"
                        value={Math.round(parseFloat((result as any).cosine_similarity) * 100)}
                      />
                    </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '10px',
                        }}
                      >
                      { Math.round(parseFloat((result as any).cosine_similarity) * 100) }
                      % similar - { (result as any).author }
                      <Button
                        variant='outlined'
                        href={`https://reddit.com/${(result as any).permalink}`}>
                          View Post
                        </Button>
                      </div>
                    </Typography>

                    <Card
                      style={{
                        margin: 'auto',
                        padding: '15px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        width: '90%',
                        background: '#fff1',
                      }}
                    >
                    <Typography variant='body2' padding='10px'>

                      { (result as any).body }
                    </Typography>
                    </Card>
                  </Stack>
                </Card>
                <Tooltip title='Add to Documents' placement='right'>
                  <Button
                    disabled={searchTitle((result as any).id)}
                    onClick={() => savePost(result) }
                  >
                    <AddBoxIcon
                      sx={{
                        fontSize: '50px',
                        verticalAlign: 'middle',
                        display: 'inline-block',
                      }}
                    />
                  </Button>
                </Tooltip>
              </div>
            ))
          }
        </div>
        </>
        )}
      </div>
    </div>
    </>
  );
}
