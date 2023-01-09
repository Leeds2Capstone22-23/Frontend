import {
  Paper, Popper, Button, Typography, Grow, TextField, IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { VirtualElement } from '../types/types';
import detectHighlight from '../logic/detectHighlight';
import '../styling/main.css';

export default function DocumentPage() {
  // -----
  // STATE VARS
  // -----
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [
    selectionVirtualElement,
    setSelectionVirtualElement,
  ] = useState<VirtualElement | undefined>();
  const [
    savedSelectionLocation,
    setSavedSelectionLocation,
  ] = useState<VirtualElement | undefined>();
  const [selectionRange, setSelectionRange] = useState<Range | undefined>();
  const [tagName, setTagName] = useState('');
  const [tagDescription, setTagDescription] = useState('');

  // -----
  // USE EFFECT
  // -----
  // Add the event listener for highlighted text to the window on load
  useEffect(() => {
    window.addEventListener('mouseup', (event) => {
      const detectHighightReturn = detectHighlight(event, window);
      if (detectHighightReturn) {
        setSelectionVirtualElement(detectHighightReturn[0]);
        setSelectionRange(detectHighightReturn[1]);
      }
    });
  }, []);

  useEffect(() => {
    if (!showTagOptions) {
      setSavedSelectionLocation(selectionVirtualElement);
    }
  }, [showTagOptions, selectionVirtualElement]);

  let tagOptions;
  // Ignore this branch as it is impossible to test for popper with jsdom
  /* istanbul ignore next */
  if (showTagOptions) {
    tagOptions = (
      <Box
        sx={{
          margin: 'auto',
          textAlign: 'center',
        }}
      >

        <div style={{ position: 'absolute', right: '0', top: '0' }}>
          <IconButton
            color="primary"
            aria-label="Close add tag menu"
            onClick={() => {
              setShowTagOptions(false);
              setTagName('');
              setTagDescription('');
              setSelectionVirtualElement(undefined);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="h4" align="center" sx={{ color: 'text.secondary' }}>
          Add Tag
        </Typography>

        <TextField
          label="Tag Name"
          variant="outlined"
          sx={{
            minWidth: '25vw',
          }}
          onChange={(event) => {
            setTagName(event.target.value);
          }}
          value={tagName}
        />
        <br />
        <br />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          minRows={3}
          sx={{
            minWidth: '25vw',
          }}
          onChange={(event) => {
            setTagDescription(event.target.value);
          }}
          value={tagDescription}
        />
        <br />
        <br />
        <Button
          variant="contained"
          onClick={() => {
            setShowTagOptions(false);
            setTagName('');
            setTagDescription('');
            setSelectionVirtualElement(undefined);
          }}
        >
          Add Tag
        </Button>
      </Box>
    );
  } else {
    tagOptions = (
      <Button
        onClick={() => {
          setShowTagOptions(true);
          if (selectionRange) {
            const node = document.createElement('span');
            const range = selectionRange;
            node.appendChild(range.extractContents());
            range.insertNode(node);
            window.getSelection()?.removeAllRanges();
          }
        }}
        variant="text"
      >
        Tag
      </Button>
    );
  }

  // -----
  // COMPONENT
  // -----
  return (
    /* This box should probably be removed in favor of just a
    global css setting, but for now it works */
    <Box
      sx={{
        pt: 5,
      }}
    >
      {/* Handles Pop-up 'Tag' Menu */}
      <Popper
        className="popper-root"
        open={
                savedSelectionLocation !== undefined
                && (selectionVirtualElement !== undefined || showTagOptions)
            }
        placement="top"
        anchorEl={savedSelectionLocation}
      >
        {/* Transition the Tag Menu in */}
        <Grow in>
          <Paper
            elevation={3}
            sx={{
              padding: 1,
            }}
          >
            {/* Tag Options */}
            {tagOptions}
          </Paper>
        </Grow>
      </Popper>
      {/* Main "Document View" */}
      <Box
        sx={{
          width: '50%',
          aspectRatio: '16 / 22',
          margin: 'auto',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            height: '100%',
            p: 5,
            display: 'inline-block',
          }}
        >
          {/* Main Content */}
          <div id="main-document-text">
            {/* eslint-disable-next-line max-len */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rutrum id justo at auctor. Suspendisse at dui risus. Cras condimentum neque a nisi maximus aliquam. Cras non feugiat nunc. Sed non libero gravida, consectetur metus id, iaculis quam. Donec eget nibh ac risus ornare sagittis quis a quam. Curabitur elementum laoreet elit, nec dapibus velit dapibus vitae. Phasellus pellentesque, risus at sollicitudin convallis, urna urna rutrum ligula, sit amet elementum urna mi in arcu. Nulla hendrerit iaculis augue, molestie tristique odio molestie a. Pellentesque pellentesque ut mauris in eleifend. Sed eget convallis diam. Donec id porttitor ipsum. Aliquam sed dapibus ante, lobortis consectetur nunc. Quisque dictum enim sit amet enim fringilla consequat. Nam aliquet, est id congue rutrum, ex arcu dignissim risus, id volutpat tortor orci sit amet massa. Nam eu enim feugiat, accumsan magna in, consectetur ligula.
            <br />
            <br />
            {/* eslint-disable-next-line max-len */}
            In ullamcorper, diam nec dignissim ornare, nulla mauris faucibus mauris, at gravida enim tellus at lorem. Integer a facilisis augue, vitae vulputate mauris. Quisque vitae imperdiet neque. In ut consequat odio. Nulla eget erat nec ligula finibus posuere. Nam lacus elit, varius nec laoreet eget, sollicitudin in metus. Fusce in rhoncus turpis, eu placerat augue. Curabitur scelerisque dolor vel nunc ornare, vel condimentum arcu viverra. Aliquam et pretium justo, quis rhoncus risus. Sed sit amet turpis urna. Suspendisse potenti.
            <br />
            <br />
            {/* eslint-disable-next-line max-len */}
            Integer urna urna, fermentum et vehicula vehicula, aliquet sed elit. Etiam ullamcorper, ipsum sed congue sollicitudin, nisi nulla efficitur tellus, at venenatis metus ex et magna. In finibus ipsum ac odio rutrum fermentum. Quisque malesuada eget dolor ut vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis vitae justo velit. Sed lacus neque, dapibus a elementum eget, rhoncus et augue.
            <br />
            <br />
            {/* eslint-disable-next-line max-len */}
            Sed ut suscipit orci. Aliquam lorem nisl, sagittis a rutrum at, vestibulum nec orci. Mauris tristique porttitor risus, non tristique nisl bibendum eget. In congue tristique sapien et egestas. Nam vehicula mi vitae commodo elementum. Maecenas eu nibh vel dolor gravida molestie. Integer non cursus dolor. Maecenas sagittis dui sit amet nunc egestas maximus a eu est.
          </div>
        </Paper>
      </Box>
    </Box>
  );
}
