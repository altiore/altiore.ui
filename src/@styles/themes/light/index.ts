import { createMuiTheme, Theme } from '@material-ui/core/styles';

import MuiDialog from './MuiDialog';
import {
  BACKGROUND_DARK,
  BACKGROUND_DEFAULT,
  prettyScroll1,
  SECONDARY_DARK,
  SECONDARY_DARKEN,
  SECONDARY_LIGHT,
  SECONDARY_MAIN,
} from './variables';

const defaultTheme: Theme = createMuiTheme({});

export default createMuiTheme({
  themeName: 'LIGHT',
  mainContent: {
    scroll: prettyScroll1,
    width: 1012,
  },
  mixins: {
    toolbar: {
      height: 56,
    },
  },
  overrides: {
    ...MuiDialog(defaultTheme),
    MuiExpansionPanelDetails: {
      root: {
        padding: '0 16px 16px',
      },
    },
    MuiFormHelperText: {
      root: {
        backgroundColor: 'transparent',
        bottom: -13,
        position: 'absolute',
      },
    },
    MuiInputAdornment: {
      positionStart: {
        left: defaultTheme.spacing(1.25),
        position: 'absolute',
        zIndex: 1,
      },
      root: {
        color: '#878787',
      },
    },
    MuiInputBase: {
      input: {
        borderRadius: 4,
      },
    },
    MuiOutlinedInput: {
      adornedStart: {
        paddingLeft: 0,
      },
      input: {
        fontSize: defaultTheme.typography.pxToRem(14),
        height: defaultTheme.typography.pxToRem(36),
        minWidth: defaultTheme.spacing(20),
        padding: 0,
        position: 'absolute',
        width: `calc(100% - ${defaultTheme.spacing(4.25)}px)`,
      },
      inputAdornedStart: {
        paddingLeft: defaultTheme.spacing(4.25),
      },
      notchedOutline: {
        zIndex: 1,
      },
      root: {
        backgroundColor: defaultTheme.palette.background.default,
        borderRadius: defaultTheme.shape.borderRadius,
        height: defaultTheme.typography.pxToRem(36),
      },
    },
    MuiTextField: {
      root: {
        marginBottom: defaultTheme.spacing(2),
        width: '100%',
      },
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: 6,
        paddingRight: 6,
      },
      root: {
        zIndex: defaultTheme.zIndex.drawer + 1,
        [defaultTheme.breakpoints.down('sm')]: {
          ...(defaultTheme.overrides as any).MuiAppBar,
          padding: 0,
        },
      },
    },
  },
  palette: {
    background: {
      default: BACKGROUND_DEFAULT,
      paper: '#fff',
    },
    primary: {
      contrastText: '#ffffff',
      dark: '#000000',
      light: '#404448',
      main: BACKGROUND_DARK,
    },
    secondary: {
      contrastText: '#24292E',
      dark: SECONDARY_DARK,
      light: SECONDARY_LIGHT,
      main: SECONDARY_MAIN,
    },
  },
  textGradient: [
    {
      '-webkit-background-clip': 'text',
      background: `linear-gradient(60deg,
     ${SECONDARY_DARKEN} 0%,
      ${SECONDARY_DARK} 10%,
      ${SECONDARY_DARK} 40%,
       ${SECONDARY_LIGHT} 55%,
        ${SECONDARY_DARK} 70%,
         ${SECONDARY_DARK} 100%
         )`,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  ],
  typography: {
    button: {
      textTransform: 'none',
    },
    h2: {
      fontSize: defaultTheme.typography.pxToRem(14),
      fontWeight: 700,
    },
    h5: {
      fontSize: defaultTheme.typography.pxToRem(18),
      fontWeight: 500,
    },
  },
});

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    themeName?: string;
    mainContent: {
      scroll: object;
      width: number;
    };
    textGradient: object[];
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    themeName?: string;
    mainContent?: {
      scroll?: object;
      width?: number;
    };
    textGradient?: object[];
  }
}