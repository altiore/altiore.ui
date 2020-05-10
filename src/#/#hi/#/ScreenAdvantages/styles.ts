import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
  },
  description: {},
  descriptionWrapper: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  hoveredItems: {
    marginTop: theme.spacing(2),
  },
  list: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
    },
  },
  loginBlock: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    boxShadow: theme.shadows[6],
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    width: 'fit-content',
  },
  loginTitle: {
    textAlign: 'center',
    width: 260,
  },
  loginWrap: {
    display: 'flex',
    marginTop: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
    },
  },
}));
