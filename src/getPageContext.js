/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import brown from '@material-ui/core/colors/brown';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    secondary: {
      light: brown[300],
      main: brown[500],
      dark: brown[700],
    },
    fire: {
      light: '#e46646',
      main: '#c94524',
      dark: '#9e4832',
    },
    lightning: {
      light: '#e3cd73',
      main: '#cbaf3f',
      dark: '#ad9b52',
    },
    life: {
      light: '#9ed24d',
      main: '#78b717',
      dark: '#709b2e',
    },
    water: {
      light: '#51c7d8',
      main: '#24b4c9',
      dark: '#3c9dab',
    },
    frost: {
      light: '#7985d4',
      main: '#4a5ac5',
      dark: '#4e5790',
    },
    hex: {
      light: '#cc72d7',
      main: '#bd45cb',
      dark: '#974e9f',
    },
    rock: {
      light: '#a18e7a',
      main: '#8d7760',
      dark: '#6c645b',
    },
    grass: {
      light: '#95ba59',
      main: '#759f33',
      dark: '#678041',
    },
    death: {
      light: '#5d586b',
      main: '#48415a',
      dark: '#332b45',
    },
  },
  typography: {
    fontSize: 10
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
