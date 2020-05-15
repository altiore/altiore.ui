import { error } from 'react-notification-system-redux';

import get from 'lodash/get';
import { Dispatch } from 'redux';
import { FormErrors, InjectedFormProps } from 'redux-form';

export const onSubmitFail = <P = any, ErrorType = any>(
  errors: FormErrors<FormData, ErrorType> | undefined,
  dispatch: Dispatch<any>,
  submitError: any,
  props: P & InjectedFormProps<FormData, P, ErrorType>
) => {
  if (submitError) {
    const status = get(submitError, 'error.response.status', 0);
    if (status < 400) {
      dispatch(
        error({
          message: submitError.toString(),
          position: 'tr',
          title: 'Ошибка формы',
        })
      );
    }
  }
};
