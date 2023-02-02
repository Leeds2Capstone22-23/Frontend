/* eslint-disable @typescript-eslint/naming-convention */
import {
  Alert,
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
import LabelIcon from '@mui/icons-material/Label';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { DocData, DocStatus } from '../../redux/hooks/docHook';
import { LabelData } from '../../redux/hooks/labelHook';
import { SnippetData } from '../../redux/hooks/snippetHook';
import {
  NewSnippet, Snippet, Status, VirtualElement,
} from '../../types/types';
import { colors } from '../../styling/Colors';
import Page404 from '../Page404';
import detectHighlight from '../../logic/detectHighlight';
import '../../styling/main.css';
import { createNewSnippet } from '../../logic/apiRequest';

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
  const [selectedLabel, setSelectedLabel] = useState(10);
  const [contentCleaned, _setContentCleaned] = useState<any>();
  const contentCleanedRef = React.useRef(contentCleaned);
  const setContentCleaned = (data) => {
    contentCleanedRef.current = data;
    _setContentCleaned(data);
  };
  const [refreshSnippets, setRefreshSnippets] = useState(false);
  const [newSnippetData, setNewSnippetData] = useState<NewSnippet>({
    document_id: -1,
    label_id: -1,
    length: -1,
    char_offset: -1,
  });
  const [addSnippetStatus, setAddSnippetStatus] = useState(Status.Initial);

  // ** ROUTER **
  const { documentID } = useParams();

  // ** REDUX **
  const documentData = DocData();
  const documentStatus = DocStatus();
  const snippetData = SnippetData(refreshSnippets);
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
  ) : ('#FFFFFF')
}C0;'>`,
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
    const added = currDocumentExpanded.replace(
      /(?:)/g,
      (_, index) => obj[index] || '',
    );
    return `<p class="docText">${added}</p>`;
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
              setSelectionVirtualElement(detectHighightReturn);
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
    if (labelData.length > 0) {
      setSelectedLabel(labelData[0].id);
    }
  }, [snippetData, labelData]);

  useEffect(() => {
    if (!showSnippetCreationOptions) {
      setSavedSelectionLocation(selectionVirtualElement);
    }
  }, [showSnippetCreationOptions, selectionVirtualElement]);

  useEffect(() => {
    if (refreshSnippets) {
      setContentCleaned(addSnippets(
        currDocument.content || '',
        snippetData,
      ));
      setRefreshSnippets(false);
    }
  }, [refreshSnippets]);

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
          minWidth: '350px',
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
        <div style={{ padding: '20px' }}>
          <FormControl fullWidth>
            <InputLabel>Select Label</InputLabel>
            <Select
              value={selectedLabel}
              label="Select Label"
              onChange={(event) => {
                setSelectedLabel(Number(event.target.value));
              }}
              style= {{
                textAlign: 'left',
              }}
            >
              {labelData.map((curr) => (
                <MenuItem key={curr.id} value={curr.id}>
                  <div>
                  <LabelIcon sx={{
                    color:
                      (curr.color >= 0 && curr.color < colors.length)
                        ? colors[curr.color]
                        : '',
                    verticalAlign: 'middle',
                    display: 'inline-block',
                    marginRight: '10px',
                  }}
                    />
                  <span
                   style={{
                     verticalAlign: 'middle',
                     display: 'inline-block',
                   }}
                  >{curr.name}</span>
                  </div>
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            setShowSnippetCreation(false);
            setShowSnippetCreationOptions(false);
            setSelectionVirtualElement(undefined);
            createNewSnippet(
              setAddSnippetStatus,
              {
                ...newSnippetData,
                label_id: selectedLabel,
              },
              setRefreshSnippets,
            );
          }}
        >
          Add Snippet
        </Button>
      </Box>
    );
  } else {
    snippetOptions = (
      <Button
        onClick={async () => {
          setShowSnippetCreationOptions(true);
          const offset = currDocument.content!
            .indexOf(
              window.getSelection()?.getRangeAt(0)!.toString()!.replaceAll('\n\n', '\n')!,
            );
          setNewSnippetData({
            document_id: currDocument.id!,
            label_id: selectedLabel,
            length: (window.getSelection()!.toString().length),
            char_offset: offset + currDocument.content!.substring(0, offset).split('\n').length - 1,
          });
          setContentCleaned(addSnippets(
            currDocument.content || '',
            [{
              id: -1,
              document_id: currDocument.id,
              label_id: -1,
              length: (window.getSelection()!.toString().length),
              // This is not the right way to do this, but I'm leaving it for now
              // TODO: find a better way to grab index
              char_offset: currDocument.content!
                .replaceAll('\n', '\n\n')
                .indexOf(window.getSelection()?.getRangeAt(0)!.toString()!),
            }] as Snippet[],
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
        {(addSnippetStatus === Status.Succeeded)
          ? (
          <Alert
            style={{ maxWidth: '1000px', margin: 'auto' }}
            onClose={() => {
              setAddSnippetStatus(Status.Initial);
            }}
            severity="success">
              Snippet Created Successfully
            </Alert>)
          : (<></>)}
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
