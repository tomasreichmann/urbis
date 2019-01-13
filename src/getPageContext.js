/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from "jss";
import {
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    common: {
      white: "#b7a8a3"
    },
    primary: {
      light: "#8ddc7c",
      main: "#5bab4e",
      dark: "#287a21"
      // contrastText: grey[900],
    },
    secondary: {
      light: "#d1967b",
      main: "#9e684f",
      dark: "#6d3d26"
    },
    grey: {
      light: "#8e7b74",
      main: "#604f49",
      dark: "#362722"
    },
    background: {
      paper: "#604f49"
    },
    text: {
      primary: "rgba(255, 255, 255, 0.75)"
    }
  },
  typography: {
    fontFamily: "Eczar, Helvetica, Arial, sans-serif",
    fontSize: 15
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#362722"
      }
    }
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
    generateClassName: createGenerateClassName()
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
