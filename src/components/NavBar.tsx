// MUI + React
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Tooltip } from '@mui/material';

// ICONS
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import LabelIcon from '@mui/icons-material/Label';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

// Locals
import { useNavigate } from 'react-router-dom';
import { LabelData } from '../redux/hooks/labelHook';
import { colors } from '../styling/Colors';
import { AuthData } from '../redux/hooks/authHook';
import redirect from '../logic/routerRedirect';

// This handles the actual drawer component including setting the width and look
// eslint-disable-next-line @typescript-eslint/naming-convention
const Drawer = styled(MuiDrawer)(
  ({ theme }) => ({
    width: 60,
    ...{
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '& .MuiDrawer-paper': {
        width: `calc(${theme.spacing(8)} + 1px)`,
      },
    },
  }),
);
const mainIcons = [
  { name: 'Home', icon: (<HomeIcon />), location: '/' },
  { name: 'Search', icon: (<SearchIcon />), location: '/search' },
  { name: 'Documents', icon: (<FolderIcon />), location: '/documents' },
  { name: 'Snippets', icon: (<SpeakerNotesIcon />), location: '/snippets' },
];

export default function NavBar(props:any) {
  // ** REDUX **
  const labelData = LabelData();
  const authData = AuthData();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent">
        <Divider />
        <List>
          {mainIcons.map((curr) => (
            <Tooltip key={curr.name} title={curr.name} placement='right' arrow>
                <ListItem key={curr.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                    }}
                    onClick={(event) => {
                      redirect(event, curr.location, navigate);
                    }}
                    href={curr.location}
                >
                    <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                    }}
                    >
                    {curr.icon}
                    </ListItemIcon>
                </ListItemButton>
                </ListItem>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <List>
          {labelData.map((curr) => (
            <Tooltip key={curr.name} title={curr.name} placement='right' arrow>
                <ListItem key={curr.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                    }}
                    onClick={(event) => {
                      redirect(event, `/label/${curr.id}`, navigate);
                    }}
                    href={`/label/${curr.id}`}
                >
                    <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                    }}
                    >
                    <LabelIcon sx={{
                      color:
                      (curr.color >= 0 && curr.color < colors.length)
                        ? colors[curr.color]
                        : '',
                    }}
                    />
                    </ListItemIcon>
                </ListItemButton>
                </ListItem>
            </Tooltip>
          ))}
        </List>
          <Tooltip key='Add Label' title='Add Label' placement='right' arrow>
            <ListItem key='Add Label' disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
                // TODO: Maybe not a redirect to a new page, maybe just make with popup?
                onClick={(event) => {
                  redirect(event, '/add-label', navigate);
                }}
                href={'/add-label'}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                }}
                >
                <AddCircleOutlineIcon/>
              </ListItemIcon>
          </ListItemButton>
          </ListItem>
        </Tooltip>
        <Divider />
        <Tooltip key='Settings' title="Settings" placement='right' arrow>
            <ListItem key='Settings' disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
                onClick={(event) => {
                  redirect(event, '/settings', navigate);
                }}
                href={'/settings'}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                }}
                >
                <SettingsIcon/>
              </ListItemIcon>
          </ListItemButton>
          </ListItem>
        </Tooltip>

        <Tooltip key='Account' title={authData.username} placement='right' arrow>
            <ListItem key='Account' disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
                onClick={(event) => {
                  redirect(event, '/account', navigate);
                }}
                href={'/account'}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                }}
                >
                <PersonIcon/>
              </ListItemIcon>
          </ListItemButton>
          </ListItem>
        </Tooltip>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {props.children}
      </Box>
    </Box>
  );
}
