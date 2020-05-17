import React, { lazy } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TelegramIco from '@components/@icons/Telegram';

import NestedRoute from '#/@common/#NestedRoute';
import NotFound from '#/@common/NotFoundPage';
import { ROLES } from '#/@store/roles';

import { IRoute, ROLE } from '@types';
import { useAllowedRoutes } from '@utils/useAllowedRoutes';

export interface IHiProps {
  brandName: string;
  classes: any;
  userRole: ROLE;
}

export const HI_ROUTES: IRoute[] = [
  {
    access: [ROLES.ALL],
    component: lazy(() => import('./#')),
    exact: true,
    path: '/hi',
  },
  {
    access: [ROLES.ALL],
    component: lazy(() => import('./#support')),
    exact: true,
    path: '/hi/support',
  },
];

export const HiTsx: React.FC<IHiProps> = ({ userRole, brandName, classes }) => {
  const preparedRoutes = useAllowedRoutes(HI_ROUTES, userRole);

  return (
    <Grid container direction="column" className={classes.root}>
      <Helmet>
        <body className={classes.hiBody} />
      </Helmet>

      <Switch>
        {preparedRoutes.map((route: IRoute) => (
          <NestedRoute key={route.path} {...route} />
        ))}
        <Route component={NotFound} />
      </Switch>

      <AppBar key={'bottom'} position="static" component={'footer'} color="default">
        <Toolbar className={classes.bottomBar}>
          <Typography variant="h5" color="primary">
            Copyright &copy; {brandName}
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" href="https://t.me/razzwan_altiore" target="_blank">
              <TelegramIco />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
