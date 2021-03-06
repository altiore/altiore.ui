import { ComponentType } from 'react';

import { ACCESS_LEVEL } from './access-level';
import { ROLE } from './role';

export interface IRoute {
  access?: [ROLE | ROLE[], ACCESS_LEVEL, boolean] | [ROLE | ROLE[], ACCESS_LEVEL] | [ROLE | ROLE[]];
  component?: ComponentType | any;
  exact?: boolean;
  icon?: ComponentType | any;
  path: string;
  routes?: IRoute[];
  title?: string;
  redirect?: string;
  getReducers?: any;
  computedMatch?: any;
}
