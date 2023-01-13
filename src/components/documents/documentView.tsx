import { CircularProgress, Paper, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DocData, DocStatus } from '../../redux/hooks/docHook';
import { LabelData } from '../../redux/hooks/labelHook';
import { SnippetData } from '../../redux/hooks/snippetHook';
import { Status } from '../../types/types';
import { colors } from '../../styling/Colors';
import Page404 from '../Page404';

export default function DocumentView() {
  const { documentID } = useParams();
  const documentData = DocData();
  const documentStatus = DocStatus();
  const snippetData = SnippetData();
  const labelData = LabelData();

  const currDocument = { ...documentData.find((curr) => curr.id === Number(documentID)) };

  const snippetsInDoc = snippetData.filter((curr) => curr.document_id === Number(documentID));

  function addSnippets(toChange: String):String {
    const currDocumentExpanded = toChange.replaceAll('\n', '\n\n');
    function generateAdditions() {
      const arr = [[0, '']];
      snippetsInDoc.forEach((curr) => {
        arr.push([
          curr.char_offset,
          `<span style='background-color: 
          ${colors[labelData.find((labels) => curr.label_id === labels.id)?.color!]}
          '>`,
        ]);
        arr.push([
          curr.char_offset + curr.length,
          '</span>',
        ]);
      });
      return (arr);
    }
    const obj = {};
    generateAdditions().forEach(([start, startAdd]) => {
      obj[start] = (obj[start] || '') + startAdd;
    });

    return currDocumentExpanded.replace(
      /(?:)/g,
      (_, index) => obj[index] || '',
    );
  }

  if (documentStatus === Status.Succeeded && currDocument) {
    return (
        <>
        <Typography variant="h2" textAlign="center">
            {currDocument.title}
        </Typography>
        <div style={{ padding: '20px' }} />
            <Paper
                style={{
                  padding: '3vw',
                  whiteSpace: 'pre-line',
                }}

                dangerouslySetInnerHTML={{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                  __html: String(addSnippets(currDocument.content || '')),
                }}
            >
            </Paper>
        </>
    );
  } if (documentStatus === Status.Succeeded) {
    return (
        <Page404 />
    );
  }
  return (
        <div style={{
          textAlign: 'center',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '97vh',
        }}>
            <Typography variant="h4" textAlign="center">
                Loading Document
            </Typography>
            <div style={{ padding: '20px' }} />
            <CircularProgress/>
        </div>
  );
}
