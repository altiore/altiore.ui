import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Block from '#/#hi/#/@common/block';
import ScreenTitle from '#/#hi/#/@common/screen-title';

import SubscribeForm from './subscribe-form';
import SupportForm from './support-form';

interface ScreenSupportI {
  name: string;
}

export const useStyles = makeStyles((theme: Theme) => ({
  block: {
    '& > div': {
      minHeight: theme.spacing(38),
    },
    alignItems: 'justify',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    padding: theme.spacing(6, 2),
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 'calc(100vh - 136px)',
    overflow: 'hidden',
    position: 'relative',
  },
}));

export const ScreenSupport: React.FC<ScreenSupportI> = ({ name }) => {
  const { block, content } = useStyles();

  return (
    <Block name={name} className={content} spacing={3}>
      <ScreenTitle black>Поддержать проект</ScreenTitle>
      <Grid item md={1} xs={false} />
      <Grid className={block} item md={5} xs={12}>
        <SupportForm />
      </Grid>
      <Grid className={block} item md={5} xs={12}>
        <SubscribeForm />
      </Grid>
      <Grid item md={1} xs={false} />
    </Block>
  );
};
