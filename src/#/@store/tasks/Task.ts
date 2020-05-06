import map from 'lodash/map';

import { convertSecondsToDuration } from '#/@store/@common/helpers';

import { ITask, IUser, IUserTask } from '@types';

export class Task implements ITask {
  isDetailsLoaded: boolean;
  id: number | string;
  title: string;
  description: string;
  performerId?: number;
  performer?: IUser;
  projectId: number;
  sequenceNumber: number;
  source?: string;
  status: number;
  value: number;
  typeId?: number;
  userTasks: IUserTask[] = [];

  constructor(initial?: any) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }

  get time(): number {
    const performerUserTask = this.userTasks.find(el => el.userId === this.performerId);
    if (performerUserTask && performerUserTask.time) {
      return performerUserTask.time;
    }

    return 0;
  }

  get durationInSeconds(): number {
    const performerUserTask = this.userTasks.find(el => el.userId === this.performerId);
    if (performerUserTask && performerUserTask.time) {
      return Math.round(performerUserTask.time / 1000);
    }

    return 0;
  }

  get duration(): string {
    return convertSecondsToDuration(this.durationInSeconds);
  }

  toLowerCase() {
    return this.title.toLowerCase();
  }
}
