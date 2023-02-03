import {
  Button,
  Card,
  Link,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import LabelIcon from '@mui/icons-material/Label';
import { useNavigate } from 'react-router-dom';
import { LabelData } from '../../redux/hooks/labelHook';
import LabelCreation from './labelCreation';
import { colors } from '../../styling/Colors';
import redirect from '../../logic/routerRedirect';
import { SnippetData } from '../../redux/hooks/snippetHook';

export default function LabelBrowser() {
  const [showLabelCreation, setShowLabelCreation] = useState(false);
  const [refreshLabels, setRefreshLabels] = useState(false);

  const labelData = LabelData(refreshLabels);
  const snippetData = SnippetData();
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshLabels) {
      setRefreshLabels(false);
    }
  }, [refreshLabels]);

  return (
    <>
    <LabelCreation
      showModal={showLabelCreation}
      setShowModal={setShowLabelCreation}
      setRefreshDocs={setRefreshLabels}
      />
    <Typography variant="h2" textAlign="center">
    Labels
    </Typography>
    <div
      style={{
        maxHeight: '80vh',
        minHeight: '0px',
        overflow: 'scroll',
        maxWidth: '1000px',
        margin: 'auto',
      }}
    >
    {
      labelData.map((currLabel) => (
        <Card
          key={currLabel.id}
          style={{
            marginTop: '25px',
            marginBottom: '25px',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            key={currLabel.id}
            href={`/labels/${currLabel.id}`}
            style= {{
              height: '75px',
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
                fontSize: '50px',
                verticalAlign: 'middle',
                display: 'inline-block',
                marginRight: '10px',
              }}
            />
            <Typography
              variant="h3"
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
                variant="h4"
                textAlign="right"
                style={{
                  textAlign: 'center',
                  margin: 'auto',
                }}
            >
              {snippetData.filter((currSnippet) => (currSnippet.label_id === currLabel.id)).length}
            </Typography>
            <Typography
                variant="h5"
                textAlign="right"
            >
              Snippets
            </Typography>
          </div>
        </Card>
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
    </>
  );
}
