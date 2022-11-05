import React, { useState } from 'react';
import { Box, Card, TextField } from '@mui/material';
import { LabelData } from '../redux/hooks/labelHook';
import { Label } from '../types/types';

export default function LabelList() {
  const labelData:Label[] = LabelData(false);

  const [filterText, setFilterText] = useState('');

  const filterChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  }

  /* move label adding to this page eventually 
  <Button>Add Tag +</Button> */
  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <form>
          <TextField id="outlined-basic" label="Search" variant="outlined" value={filterText} onChange={filterChange} />
          <br/>
          
        </form>
      
        {labelData.filter((label) => (
          label.name.includes(filterText)
        )).map((label) => (
          <Box sx={{ minWidth: 250 }}>
            <Card variant="outlined" style={{ height: 40, padding: 5 }}>{label.name}</Card>
          </Box>
        ))}
      </Box>
    </div>
  );
}
