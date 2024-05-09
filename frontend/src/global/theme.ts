import { createTheme } from "@mui/material";

import Colors from "./colors";

// Visit https://mui.com/customization/palette/ for more info

// If the "dark" and / or "light" keys are omitted, their value(s)
// will be calculated from "main", according to the "tonalOffset" value.

// If "contrastText" is omitted, its value will be calculated to contrast
// with "main", according to the "contrastThreshold" value.
const theme = createTheme({
  palette: {
    text: {
      primary: Colors.textMain
    },
    primary: {
      main: Colors.primaryMain
    },
    secondary: {
      main: Colors.secondaryMain,
    },
    error: {
      main: Colors.errorMain,
    },
    warning: {
      main: Colors.warningMain,
    },
    info: {
      main: Colors.infoMain,
    },
    success: {
      main: Colors.successMain,
    },
    background: {
      default: Colors.backgroundDefault,
      paper: Colors.backgroundPaperLight
    },
    contrastThreshold: 2,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Montserrat',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.667rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.667rem',
      fontWeight: 700
    },
    h4: {
      fontSize: '1.333rem',
      fontWeight: 700
    },
    h5: {
      fontSize: '1.333rem',
      fontWeight: 600,
      textTransform: 'uppercase'
    },
    h6: {
      fontSize: '1.333rem',
      fontWeight: 500
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 600
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400
    }
  },
});

export const HEADER_HEIGHT_DESKTOP = 7.5;
export const HEADER_HEIGHT_MOBILE = 5.25;

export const FOOTER_HEIGHT = 66;
export const SCREEN_HEIGHT = {
  xs: `${window.innerHeight - FOOTER_HEIGHT - HEADER_HEIGHT_MOBILE}rem`,
  sm: `${window.innerHeight - FOOTER_HEIGHT - HEADER_HEIGHT_DESKTOP}rem`
}

export default theme;
