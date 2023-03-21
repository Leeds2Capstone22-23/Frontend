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
import DescriptionIcon from '@mui/icons-material/Description';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import LabelIcon from '@mui/icons-material/Label';
import MoreIcon from '@mui/icons-material/More';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

// Locals
import { useNavigate } from 'react-router-dom';
import { LabelData } from '../redux/hooks/labelHook';
import { colors } from '../styling/Colors';
import { AuthData } from '../redux/hooks/authHook';
import redirect from '../logic/routerRedirect';
import '../styling/main.css';

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
  { name: 'Documents', icon: (<DescriptionIcon />), location: '/documents' },
  { name: 'Labels', icon: (<MoreIcon />), location: '/labels' },
  { name: 'Snippets', icon: (<ContentCutIcon />), location: '/snippets' },
  { name: 'Quick Add', icon: (<AddIcon />), location: '/add' },
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
        <List style={{ overflow: 'scroll' }} className='navbar-labels'>
          {labelData.map((curr) => (
            <Tooltip key={curr.name} title={curr.name} placement='right' arrow>
                <ListItem key={curr.name} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                    }}
                    onClick={(event) => {
                      redirect(event, `/labels/${curr.id}`, navigate);
                    }}
                    href={`/labels/${curr.id}`}
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
                        ? colors[curr.color].color
                        : '',
                    }}
                    />
                    </ListItemIcon>
                </ListItemButton>
                </ListItem>
            </Tooltip>
          ))}
        </List>
        <div style={{ height: 'auto', margin: 'auto' }}/>
        <List>

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
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {props.children}
      </Box>
    </Box>
  );
}
