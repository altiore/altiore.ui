import React from 'react';

import cn from 'classnames';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';

interface ScreenTitleI {
  black?: boolean;
  children: any;
}

const ScreenTitle: React.FC<ScreenTitleI> = ({ children, black }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item md={1} xs={false} />
      <Grid item className={cn(classes.title, { [classes.titleBlack]: black })} md={11} xs={12}>
        <div className={classes.line} />
        <Typography variant="h2">{children}</Typography>
      </Grid>
    </>
  );
};

export default ScreenTitle;
