import {
  Button, CircularProgress, Divider, Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import redirect from '../logic/routerRedirect';
import { DocData, DocStatus } from '../redux/hooks/docHook';
import { LabelData, LabelStatus } from '../redux/hooks/labelHook';
import { SnippetData, SnippetStatus } from '../redux/hooks/snippetHook';
import { Status } from '../types/types';

interface HomeCardProps {
  name: string,
  number: string,
  status: Status
}
function HomeCard(props:HomeCardProps) {
  if (props.status === Status.Loading) {
    return (
            <div>
                <CircularProgress />
            </div>
    );
  }
  return (
                <div>
                <Typography variant="h2" textAlign="center">
                    {props.number}
                </Typography>
                <Typography variant="h4" textAlign="center">
                    {props.name}
                </Typography>
                </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const labelData = LabelData();
  const labelStatus = LabelStatus();
  const docData = DocData();
  const docStatus = DocStatus();
  const snippetData = SnippetData();
  const snippetStatus = SnippetStatus();
  return (
    <>
        <div style={{ height: '10vh' }} />
        <Typography variant="h2" textAlign="center">
            Welcome To SNPT
        </Typography>
        <div style={{ height: '20vh' }} />
        <Typography variant="h4" textAlign="center">
            What would you like to work on today?
        </Typography>
        <div style={{ height: '30vh' }} />
        <Grid container>
            <Grid item xs>
                <div style={{ textAlign: 'center' }}>
                <Button
                        href="/documents"
                        style={{ width: '25vw', height: '15vh' }}
                        onClick={(event) => {
                          redirect(event, '/documents', navigate);
                        }}
                    >
                        <HomeCard
                            name={docData.length === 1 ? 'Document' : 'Documents'}
                            number={docData.length.toString()}
                            status={docStatus}
                        />
                    </Button>
                </div>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ margin: '0px 30px 0px 30px' }} />
            <Grid item xs>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        href="/labels"
                        style={{ width: '25vw', height: '15vh' }}
                        onClick={(event) => {
                          redirect(event, '/labels', navigate);
                        }}
                    >
                        <HomeCard
                            name={labelData.length === 1 ? 'Label' : 'Labels'}
                            number={labelData.length.toString()}
                            status={labelStatus}
                        />
                    </Button>
                </div>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ margin: '0px 30px 0px 30px' }} />
            <Grid item xs>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        href="/snippets"
                        style={{ width: '25vw', height: '15vh' }}
                        onClick={(event) => {
                          redirect(event, '/snippets', navigate);
                        }}
                    >
                        <HomeCard
                            name={snippetData.length === 1 ? 'Snippet' : 'Snippets'}
                            number={snippetData.length.toString()}
                            status={snippetStatus}
                        />
                    </Button>
                </div>
            </Grid>
        </Grid>
    </>
  );
}
