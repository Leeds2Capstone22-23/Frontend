import { Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import redirect from '../logic/routerRedirect';

interface HomeCardProps {
  name: string,
  number: string
}
function HomeCard(props:HomeCardProps) {
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
  return (
    <>
        <div style={{ height: '10vh' }} />
        <Typography variant="h2" textAlign="center">
            Welcome To Tag &apos;n Bag!
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
                        <HomeCard name="Documents" number="69" />
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
                        <HomeCard name="Labels" number="11" />
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
                        <HomeCard name="Snippets" number="420" />
                    </Button>
                </div>
            </Grid>
        </Grid>
    </>
  );
}
