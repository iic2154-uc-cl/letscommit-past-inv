import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider, styled, responsiveFontSizes } from '@mui/material/styles'
  
let theme = createTheme({
typography: {
    fontFamily: `"Sora", sans-serif`,
    fontWeightRegular: 500,
    fontSize: 16,
    h1 : {
      fontWeight: 600
    },
    h2 : {
      fontWeight : 600,
    },
    // h3 : {
    //     fontFamily : `"DM Sans", sans-serif`,
    //     fontWeight : 600,
    //     fontSize : 30,
    // },
    h4 : {
      fontWeight : 600,
    },
    h5 : {
      fontWeight : 600,
    },
    h6 : {
        fontWeight : 500,
        fontSize : 18,
        //letterSpacing: 0,
    },
    subtitle1 : {
        fontWeight : 400,
        fontSize : 14,
    },
    subtitle2 : {
        fontWeight : 400,
        fontSize : 12
    },
    code : {
      fontFamily : `'Source Code Pro', monospace;`,
      fontWeight : 400,
    }
},
palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#24292f', //orange
      // dark: will be calculated from palette.primary.main,
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#0066ff',
      main: '#FFFFFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#0f141a',
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: '#0f141a',
      secondary: '#536471'
    },
    purple: {
      light: '#AD70FB',
      main: '#54008c',
      dark: '#350059'
    },
    green: {
      light: '#1CC859',
      dark: '#0A471F'
    },
    orange: {
      light: '#FF7F4D',
      dark: '#5A230D'
    },
    grey: {
      light: '#A6A6A6',
      dark: '#0D0D0D'
    }
  }
});

theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ThemeProvider theme={theme}><App/></ThemeProvider>)