import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grow,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Popper,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { DocData, DocStatus } from '../../redux/hooks/docHook';
import { LabelData } from '../../redux/hooks/labelHook';
import { SnippetData } from '../../redux/hooks/snippetHook';
import { Snippet, Status, VirtualElement } from '../../types/types';
import { colors } from '../../styling/Colors';
import Page404 from '../Page404';
import detectHighlight from '../../logic/detectHighlight';

export default function DocumentView() {
  // ** STATE **
  const [showSnippetCreation, setShowSnippetCreation] = useState(false);
  const [showSnippetCreationOptions, _setShowSnippetCreationOptions] = useState(false);
  const showSnippetCreationOptionsRef = React.useRef(showSnippetCreationOptions);
  const setShowSnippetCreationOptions = (data) => {
    showSnippetCreationOptionsRef.current = data;
    _setShowSnippetCreationOptions(data);
  };
  const [
    selectionVirtualElement,
    setSelectionVirtualElement,
  ] = useState<VirtualElement | undefined>();
  const [
    savedSelectionLocation,
    setSavedSelectionLocation,
  ] = useState<VirtualElement | undefined>();
  const [selectionRange, setSelectionRange] = useState<Range | undefined>();
  const [selectedLabel, setSelectedLabel] = useState<any>();
  const [contentCleaned, setContentCleaned] = useState<any>();

  // ** ROUTER **
  const { documentID } = useParams();

  // ** REDUX **
  const documentData = DocData();
  const documentStatus = DocStatus();
  const snippetData = SnippetData();
  const labelData = LabelData();

  /**
   * This function takes the content and adds the neccessary line
   * breaks and adds the highlights for snippets
   * @param toChange The string containing all the contents of the document
   * @returns a string containing all the contents of the documents with
   * neccessary highlights and line breaks
   */
  function addSnippets(toChange: String, snippets: Snippet[]):String {
    const currDocumentExpanded = toChange.replaceAll('\n', '\n\n');
    function generateAdditions() {
      const arr = [[0, '']];
      snippets.filter((curr) => curr.document_id === Number(documentID)).forEach((curr) => {
        arr.push([
          curr.char_offset,
          `<span style='background-color: 
          ${
  (curr.label_id !== -1) ? (
    colors[labelData.find((labels) => curr.label_id === labels.id)?.color!]
  ) : ('rgba(255,255,255,0.5)')
}
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
    // generates the additions before adding them, so
    // indexes don't get messed up
    generateAdditions().forEach(([start, startAdd]) => {
      obj[start] = (obj[start] || '') + startAdd;
    });

    // add the actual additions
    return currDocumentExpanded.replace(
      /(?:)/g,
      (_, index) => obj[index] || '',
    );
  }

  const currDocument = { ...documentData.find((curr) => curr.id === Number(documentID)) };

  // -----
  // USE EFFECT
  // -----
  // Add the event listener for highlighted text to the window on load
  useEffect(() => {
    ['mouseup', 'dblclick'].forEach((curr) => {
      window.addEventListener(curr, (event) => {
        if (showSnippetCreationOptionsRef.current !== true) {
          if (
            window.getSelection() !== null
            && window.getSelection()!.toString().length > 0
          ) {
            event.preventDefault();
            const detectHighightReturn = detectHighlight(event, window);
            if (detectHighightReturn) {
              setSelectionVirtualElement(detectHighightReturn[0]);
              setSelectionRange(detectHighightReturn[1]);
            }
            setShowSnippetCreation(true);
          } else {
            setShowSnippetCreation(false);
          }
        } else {
          event.preventDefault();
        }
      });
    });
  }, []);

  useEffect(() => {
    setContentCleaned(addSnippets(
      { ...documentData.find((curr) => curr.id === Number(documentID)) }.content || '',
      snippetData,
    ));
  }, [snippetData, labelData]);

  useEffect(() => {
    if (!showSnippetCreationOptions) {
      setSavedSelectionLocation(selectionVirtualElement);
    }
  }, [showSnippetCreationOptions, selectionVirtualElement]);

  /**
   * This handles the snippet creation options
   *
   */
  let snippetOptions;
  // Ignore this branch as it is impossible to test for popper with jsdom
  /* istanbul ignore next */
  if (showSnippetCreationOptions) {
    snippetOptions = (
      <Box
        sx={{
          margin: 'auto',
          textAlign: 'center',
        }}
      >

        <div style={{ position: 'absolute', right: '0', top: '0' }}>
          <IconButton
            color="primary"
            aria-label="Close add snippet menu"
            onClick={() => {
              setShowSnippetCreation(false);
              setShowSnippetCreationOptions(false);
              setSelectionVirtualElement(undefined);
              setContentCleaned(addSnippets(
                currDocument.content || '',
                snippetData,
              ));
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="h4" align="center" style={{ padding: '20px' }}>
          Add Snippet
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Label</InputLabel>
          <Select
            value={selectedLabel}
            label="Label"
            onChange={(event) => {
              setSelectedLabel(event.target.value);
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => {
            setShowSnippetCreationOptions(false);
            setSelectionVirtualElement(undefined);
          }}
        >
          Add Snippet
        </Button>
      </Box>
    );
  } else {
    snippetOptions = (
      <Button
        onClick={() => {
          setShowSnippetCreationOptions(true);
          setContentCleaned(addSnippets(
            currDocument.content || '',
            snippetData.concat([{
              id: -1,
              document_id: currDocument.id,
              label_id: -1,
              length: (window.getSelection()!.toString().length),
              char_offset: currDocument.content!.indexOf(window.getSelection()!.toString()) + 3,
            }] as Snippet[]),
          ));
        }}
        variant="text"
      >
        Add Snippet
      </Button>
    );
  }

  if (documentStatus === Status.Succeeded && currDocument) {
    return (
        <>
        <Typography variant="h2" textAlign="center">
            {currDocument.title}
        </Typography>

        <div style={{ padding: '20px' }} />
              {/* Handles Pop-up 'Snippet' Menu */}
            <Popper
              className="popper-root"
              open={
                      showSnippetCreation
                  }
              placement="top"
              anchorEl={savedSelectionLocation}
            >
              {/* Transition the Snippet Menu in */}
              <Grow in>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 1,
                  }}
                >
                  {/* Snippet Options */}
                  {snippetOptions}
                </Paper>
              </Grow>
            </Popper>
            {/* Main Document Contents */}
            <Paper
                style={{
                  padding: '3vw',
                  whiteSpace: 'pre-line',
                  maxWidth: '1000px',
                  margin: 'auto',
                }}
                // TODO: Can we find a better way to do this that helps prevent XSS?
                dangerouslySetInnerHTML={{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                  __html: String(contentCleaned),
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
