import { requestActions } from '#/@store/@common/requestActions';

export const fetchPublicProject = requestActions<string>('PUBLIC_PROJECT/FETCH_ONE', (projectId: string) => ({
  noAuth: true,
  request: {
    url: `/public/${projectId}`,
  },
}));

export const postRequestMembershipAction = requestActions<number>(
  'PUBLIC_PROJECT/REQUEST_MEMBERSHIP',
  (projectId: number, role: string) => {
    return {
      error: {
        message: 'Не удалось отправить запрос на подключение!',
        title: 'Ошибка!',
      },
      request: {
        data: {
          role,
        },
        method: 'POST',
        url: `/projects/${projectId}/members/request`,
      },
      success: {
        message: 'Запрос на подключение отправлен!',
        title: 'Успех!',
      },
    };
  }
);
