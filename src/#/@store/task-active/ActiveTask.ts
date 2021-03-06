import map from 'lodash/map';

import { DownloadList } from '#/@store/@common/entities';

import { TaskLog } from './TaskLog';

import { IDownloadList, ITaskActive, ITaskLog } from '@types';

export class ActiveTask implements ITaskActive {
  taskLogs: IDownloadList<ITaskLog> = new DownloadList(TaskLog);

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
