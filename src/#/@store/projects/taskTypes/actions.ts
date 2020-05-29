import { requestActions } from '#/@store/@common/requestActions';

export const getAllProjectTaskTypes = requestActions('PROJECT_TASK_TYPE/GET_ALL', (projectId: number) => ({
  projectId,
  request: {
    url: `/projects/${projectId}/task-types`,
  },
}));

export const addTaskTypeToProject = requestActions(
  'PROJECTS/TASK_TYPES/POST',
  ({ projectId, taskTypeId }: { projectId: number; taskTypeId: number }) => ({
    projectId,
    request: {
      data: { taskTypeId },
      method: 'POST',
      url: `/projects/${projectId}/task-types`,
    },
    success: {
      message: '+ еще один тип задачи...',
    },
    taskTypeId,
  })
);

export const deleteTaskTypeFromProject = requestActions(
  'PROJECTS/TASK_TYPES/DELETE',
  ({ projectId, taskTypeId }: { projectId: number; taskTypeId: number }) => ({
    fail: 'Все задачи удалены!',
    projectId,
    request: {
      data: { taskTypeId },
      method: 'DELETE',
      url: `/projects/${projectId}/task-types`,
    },
    success: {
      message: 'А это здесь лишнее...',
    },
    taskTypeId,
  })
);
