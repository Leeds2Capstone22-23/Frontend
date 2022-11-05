import React from 'react';
import LabelList from './LabelList'
import { Box, Card, Grid, Tab, Tabs } from '@mui/material';

export default function LabelPage() {
  const [currTab, setCurrTab] = React.useState("one"); 
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrTab(newValue);
  };


  return (
    <div className="LabelPage">
      <br/>
      <br/>
      <Box sx={{
              width: '80%',
              aspectRatio: '16 / 22',
              margin: 'auto', }}>
      
        <Grid container spacing={2} align-content="center" justify-content="center" direction="row">
            <Grid xs={12}><h2>Labels</h2></Grid>


            <Grid xs={4}>
              <LabelList />
            </Grid>
            <Grid xs={8}>
              <Box sx={{ minWidth: 275 }}>
                <Tabs value={currTab} onChange={handleChange} aria-label="basic tabs example">
                  <Tab value="one" label="Documents"/>
                  <Tab value="two" label="Posts" />
                  <Tab value="three" label="Settings" />
                </Tabs>
                <Card variant="outlined" sx={{height: 500}}>something</Card>
              </Box>
            </Grid>
          
        </Grid>
      </Box>
      
    </div>
  );
}
