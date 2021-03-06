import { createAction } from 'redux-actions';
import { createApiAction } from 'redux-actions-api';

import { IListDto } from '@types';

const BASE_ACTION = 'ACTIVE_TASK/TASK_LOGS';

export interface ITaskLogsListDto extends IListDto {
  projectId: number;
  sequenceNumber: number;
}

export const fetchTaskLogsAction = createApiAction<ITaskLogsListDto>(
  `${BASE_ACTION}/FETCH_ALL`,
  ({ projectId, sequenceNumber, ...listDto }) => ({
    request: {
      params: {
        count: 10,
        order: 'desc',
        orderBy: 'createdAt',
        ...listDto,
      },
      url: `/projects/${projectId}/tasks/${sequenceNumber}/task-logs`,
    },
  })
);

export const clearTaskLogs = createAction(`${BASE_ACTION}/CLEAR`);
