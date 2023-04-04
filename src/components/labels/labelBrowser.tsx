import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LabelIcon from '@mui/icons-material/Label';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { LabelData } from '../../redux/hooks/labelHook';
import LabelCreation from './labelCreation';
import { colors } from '../../styling/Colors';
import { Label } from '../../types/types';
import redirect from '../../logic/routerRedirect';
import { deleteLabel } from '../../logic/apiRequest';
import { SnippetData } from '../../redux/hooks/snippetHook';
import DeleteConfirmation from '../deleteConfirmation';

export default function LabelBrowser() {
  const [labelsFiltered, setLabelsFiltered] = useState<Label[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLabelCreation, setShowLabelCreation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [refreshLabels, setRefreshLabels] = useState(false);
  const [refreshSnippets, setRefreshSnippets] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [deleteText, setDeleteText] = useState('TEMP');
  const [currentLabel, setCurrentLabel] = useState(-1);

  const labelData = LabelData(refreshLabels);
  const snippetData = SnippetData(refreshSnippets);
  const navigate = useNavigate();

  /**
   * Handles searching for filtering documents
   * @param newSearchQuery the string of the search
   */
  function searchObjects(newSearchQuery:string) {
    setSearchQuery(newSearchQuery);
    if (newSearchQuery === '') {
      setLabelsFiltered(labelData);
    } else {
      setLabelsFiltered(
        new Fuse(labelData, {
          threshold: 0.3,
          keys: [
            'title',
          ],
        })
          .search(newSearchQuery)
          .map((element) => element.item) as any,
      );
    }
  }

  useEffect(() => {
    if (refreshLabels) {
      setRefreshLabels(false);
    }

    if (refreshSnippets) {
      setRefreshSnippets(false);
    }

    if (deleteConfirmed && (currentLabel > -1)) {
      deleteLabel(currentLabel, () => {}, setRefreshLabels, setRefreshSnippets);
      setDeleteConfirmed(false);
    }
  }, [refreshLabels, refreshSnippets, deleteConfirmed]);

  useEffect(() => {
    setLabelsFiltered(labelData);
  }, [labelData]);

  return (
    <>
    <LabelCreation
      showModal={showLabelCreation}
      setShowModal={setShowLabelCreation}
      setRefreshDocs={setRefreshLabels}
      />
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
      Labels
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
          maxWidth: '1000px',
          margin: 'auto',
          paddingTop: '20px',
        }}
      >
      {
        labelsFiltered.map((currLabel) => (
          <Box
            key={currLabel.id}
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
                key={currLabel.id}
                href={`/labels/${currLabel.id}`}
                style= {{
                  height: '50px',
                  textTransform: 'none',
                }}
                onClick={(event) => {
                  redirect(event, `/labels/${currLabel.id}`, navigate);
                }}
              >
                <LabelIcon
                  sx={{
                    color:
                    (currLabel.color >= 0 && currLabel.color < colors.length)
                      ? colors[currLabel.color].color
                      : '',
                    fontSize: '40px',
                    verticalAlign: 'middle',
                    display: 'inline-block',
                    marginRight: '10px',
                  }}
                />
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
                  {currLabel.name}
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
                >
                  {snippetData.filter((currSnippet) => (currSnippet.label_id === currLabel.id)).length}
                </Typography>
                <Typography
                    variant="body1"
                    textAlign="right"
                >
                  Snippets
                </Typography>
              </div>
            </Card>

            <Button
              key={currLabel.id}
              onClick={() => {
                setCurrentLabel(currLabel.id);
                setDeleteText(`label "${currLabel.name}"`);
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
      <div style={{ marginTop: '40px', textAlign: 'center', minHeight: '50px' }}>
        <Button
            variant="outlined"
            disabled={labelData.length === 16}
            onClick={() => {
              setShowLabelCreation(true);
            }}
          >
            {(labelData.length === 16) ? ('Label Limit Reached') : ('Create Label')}
          </Button>
        </div>
      </div>
    </>
  );
}
