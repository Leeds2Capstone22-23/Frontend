import {
  Button,
  Card,
  Typography,
  Stack,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LabelIcon from '@mui/icons-material/Label';
import DescriptionIcon from '@mui/icons-material/Description';
import { colors } from '../../styling/Colors';
import { DocData } from '../../redux/hooks/docHook';
import { LabelData } from '../../redux/hooks/labelHook';
import { SnippetData } from '../../redux/hooks/snippetHook';
import { addSnippetJob, nlpSearch, retrieveJobResults } from '../../logic/apiRequest';

export default function SnippetView() {
  const { snippetID } = useParams();
  const [refreshSnippets, setRefreshSnippets] = useState(false);
  const [jobData, setJobData] = useState([]);

  // ** REDUX **
  const documentData = DocData();
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
  if (snippetJob && !jobData) {
    retrieveJobResults(snippetJob, setJobData);
  }

  function startSearch() {
    nlpSearch('SNPT search', currSnip.text, 'cuboulder', setSnippetJob, setUpdateSnippet);
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
                startSearch();
              }}
            >
              Find Similar with NLP
            </Button>
          }
        </div>
        <div>
          <Typography>{jobData.length} result(s)</Typography>
        </div>
      </div>
    </div>
    </>
  );
}
