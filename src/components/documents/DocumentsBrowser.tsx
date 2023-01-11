import {
  Button, Link, TablePagination, Typography,
} from '@mui/material';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { DocData } from '../../redux/hooks/docHook';
import { Doc } from '../../types/types';

function createData(doc: Doc) {
  const { title } = doc;
  const date = doc.time_added;
  return {
    title, date,
  };
}

export default function DocumentBrowser() {
  const docsData = DocData();
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '95vh',
      flex: 1,
    }}>
      <Typography variant="h2" textAlign="center">
          Documents
      </Typography>
      <div style={{ padding: '3vw', minHeight: '0px' }}>
        <TableContainer component={Paper} style={{ height: '100%' }}>
          <Table
            aria-label="Documents"
            stickyHeader
          >
            <TableHead >
              <TableRow>
                <TableCell sx={{ backgroundColor: '#26262e' }} >
                 <Typography variant="h6">
                    Title
                  </Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#26262e' }} align="right">
                  <Typography variant="h6">
                    Date Created
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {docsData.map((curr) => {
                const row = createData(curr);
                return (
                <TableRow
                  key={row.title}
                  sx={{ border: 0 }}
                >
                  <TableCell component="th" scope="row">
                    <Link href="#" underline="hover">
                      <Typography variant="body1">
                        {row.title}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">
                      {moment.parseZone(row.date).local().format('MMM Do YYYY')}
                    </Typography>
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ margin: '20px', textAlign: 'center', minHeight: '' }}>
        <Button variant="outlined">Create Document</Button>
      </div>
    </div>
  );
}
