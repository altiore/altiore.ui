import map from 'lodash/map';

import { IStatusMove, TASK_STATUS_MOVE_TYPE } from '@types';

export class StatusMove implements IStatusMove {
  id: number;
  projectRoleId: number;
  type: TASK_STATUS_MOVE_TYPE;
  fromName: string;
  toName: string;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
