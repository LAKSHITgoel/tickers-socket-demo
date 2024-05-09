import {useState} from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  List,
  IconButton,
  ListItem,
  ListItemText,
  ListItemButton,
  FormLabel,
  Switch,
  Typography
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';

import MenuIcon from '@mui/icons-material/Menu';

import {tickerNameListSelector, setCurrentTicker, setShowQuantity, currentTickerSelector, showQuantitySelector} from 'global/globalSlice';

import styles from './styles';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const NavigationBar = () => {
  const tickerNameList = useSelector(tickerNameListSelector);
  const showTradeVolume = useSelector(showQuantitySelector);
  const currentTicker = useSelector(currentTickerSelector);
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTickerSelect = (ticker: string) => {
    dispatch(setCurrentTicker(ticker));
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={styles.appBarToggleIcon}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1, alignItems: 'center' }}>
            <Typography variant='h4'>{currentTicker}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1, alignItems: 'center' }}>
            <FormLabel sx={{color: '#fff'}}>Trade Price</FormLabel>
            <Switch color='warning' value={showTradeVolume} onChange={(_, checked) => dispatch(setShowQuantity(checked))} />
            <FormLabel sx={{color: '#fff'}}>Trade Volume</FormLabel>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={handleDrawerClose}>
        <List sx={{mt: '5rem', width: '15rem'}} disablePadding>
          {tickerNameList?.map((tickerName) => (
            <ListItem key={tickerName}>
              <ListItemButton onClick={() => handleTickerSelect(tickerName)}>
                <ListItemText primary={tickerName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default NavigationBar;
