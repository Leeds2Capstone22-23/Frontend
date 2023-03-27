import {
  Button, Card, Paper, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LabelIcon from '@mui/icons-material/Label';
import SearchIcon from '@mui/icons-material/Search';
import Fuse from 'fuse.js';
import { LabelData } from '../../redux/hooks/labelHook';
import { colors } from '../../styling/Colors';
import Page404 from '../Page404';
import { SnippetData } from '../../redux/hooks/snippetHook';
import { DocData } from '../../redux/hooks/docHook';
import redirect from '../../logic/routerRedirect';

export default function LabelView() {
  const [snippetsFiltered, setSnippetsFiltered] = useState<SnippetDisplay[]>([]);
  const [snippetsData, setSnippetsData] = useState<SnippetDisplay[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { labelID } = useParams();
  const labelData = LabelData();
  const snippetData = SnippetData();
  const docData = DocData();
  const navigate = useNavigate();

  const currLabel = labelData.find((searchLabel) => (searchLabel.id === Number(labelID)));

  interface SnippetDisplay {
    id: number,
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
      if (doc) {
        const rawtext = doc.content.replaceAll('\n', '\n\n');
        const snippetContent = rawtext.substring(
          currSnippet.char_offset,
          currSnippet.char_offset + currSnippet.length,
        );

        storage.push({
          id: currSnippet.id,
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

  if (currLabel) {
    return (
      <>
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
          }}
        >

        {
          // HERE
            snippetsFiltered.map((currSnippet) => (
            <Card
              key={currSnippet.id}
              style={{
                marginTop: '25px',
                marginBottom: '25px',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
            <Button
            key={currSnippet.documentID}
            href={`/documents/${currSnippet.documentID}`}
            style= {{
              margin: '5px',
              marginRight: 'auto',
              maxWidth: '99%',
            }}
            onClick={(event) => {
              redirect(event, `/documents/${currSnippet.documentID}`, navigate);
            }}
          >
            <Typography
              variant="h4"
              textAlign="left"
              style={{
                verticalAlign: 'middle',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {currSnippet.documentTitle}
            </Typography>
            </Button>
              <Paper
                style={{
                  padding: '3vw',
                  whiteSpace: 'pre-line',
                  maxWidth: '1000px',
                  width: '100%',
                  margin: 'auto',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
                // TODO: Can we find a better way to do this that helps prevent XSS?
                dangerouslySetInnerHTML={{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                  __html: String(currSnippet.text),
                }}
            >
            </Paper>
            <div
              style={{
                padding: '20px',
              }}
            >

            <Button
              variant='outlined'
              style={{
                marginLeft: '10px',
                marginRight: '10px',
              }}
              onClick={() => {
                navigator.clipboard.writeText(String(currSnippet.text));
              }}
            >
              Copy To Clipboard
            </Button>
            <Button
              variant='outlined'
              style={{
                marginLeft: '10px',
                marginRight: '10px',
              }}
            >
              Something something NLP
            </Button>
            </div>
            </Card>
            ))}
        </div>
      </div>
    </>
    );
  }
  return <Page404 />;
}
