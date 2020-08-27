import { requestActions } from '#/@store/@common/requestActions';

const BASE_ACTION = 'TASK_COMMENTS';

export const getTaskComments = requestActions(
  `${BASE_ACTION}/GET_TASK_COMMENTS`,
  (projectId: number, taskId: number) => ({
    request: {
      url: `/projects/${projectId}/tasks/${taskId}/comments`,
    },
  })
);

export const postTaskComment = requestActions(
  `${BASE_ACTION}/ADD_TASK_COMMENT`,
  (projectId: number, taskId: number, comment: string) => {
    return {
      error: { message: `Минимальная длинна - 3 символа`, title: 'Провал!' },
      request: {
        data: {
          text: comment,
        },
        method: 'POST',
        url: `/projects/${projectId}/tasks/${taskId}/comments`,
      },
      success: {
        message: `Комментарий успешно добавлен`,
        title: 'Успех!',
      },
    };
  }
);

export const deleteTaskComments = requestActions(
  `${BASE_ACTION}/DELETE_TASK_COMMENT`,
  (projectId: number, taskId: number, commentId: number) => ({
    error: { message: `Ошибка при удалении`, title: 'Провал!' },
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
    },
    success: {
      message: `Комментарий успешно удален`,
      title: 'Успех!',
    },
    taskId,
  })
);
