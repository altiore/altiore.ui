import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme): any => ({
  bottomBar: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    height: 80,
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    },
  },
  button: {
    marginTop: 20,
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    padding: 15,
  },
  hiBody: {
    overflowX: 'hidden',
  },
  overlay: {
    display: 'flex',
    zIndex: 1,
  },
  paper: {
    boxSizing: 'border-box',
    height: 140,
    padding: 10,
    width: 350,
  },
  profile: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
