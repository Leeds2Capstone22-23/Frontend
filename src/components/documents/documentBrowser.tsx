import {
  Button, Link, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import { DocData } from '../../redux/hooks/docHook';
import { Doc } from '../../types/types';
import routerRedirect from '../../logic/routerRedirect';
import DocumentCreation from './documentCreation';

function createData(doc: Doc) {
  const { title, id } = doc;
  const date = doc.time_added;
  return {
    title, date, id,
  };
}

export default function DocumentBrowser() {
  const [docsFiltered, setDocsFiltered] = useState<Doc[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDocumentCreation, setShowDocumentCreation] = useState(false);
  const [refreshDocs, setRefreshDocs] = useState(false);
  const navigate = useNavigate();

  const docsData = DocData(refreshDocs);

  useEffect(() => {
    if (refreshDocs) {
      setRefreshDocs(false);
    }
  }, [refreshDocs]);

  /**
   * Handles searching for filtering documents
   * @param newSearchQuery the string of the search
   */
  function searchObjects(newSearchQuery:string) {
    setSearchQuery(newSearchQuery);
    if (newSearchQuery === '') {
      setDocsFiltered(docsData);
    } else {
      setDocsFiltered(
        new Fuse(docsData, {
          threshold: 0.3,
          keys: [
            'title',
            {
              name: 'content',
              weight: 0.2,
            },
          ],
        })
          .search(newSearchQuery)
          .map((element) => element.item),
      );
    }
  }
  useEffect(() => {
    setDocsFiltered(docsData);
  }, [docsData]);

  return (
    <>
    <DocumentCreation
      showModal={showDocumentCreation}
      setShowModal={setShowDocumentCreation}
      setRefreshDocs={setRefreshDocs}
      />
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
              {docsFiltered.map((curr) => {
                const row = createData(curr);
                return (
                <TableRow
                  key={row.id}
                  sx={{ border: 0 }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      href={`/documents/${row.id}`}
                      underline="hover"
                      onClick={(event) => routerRedirect(event, `/documents/${row.id}`, navigate)}
                    >
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
      <div style={{ marginTop: '40px', textAlign: 'center', minHeight: '' }}>
        <Button
          variant="outlined"
          onClick={() => {
            setShowDocumentCreation(true);
          }}
        >Create Document</Button>
      </div>
    </div>
    </>
  );
}