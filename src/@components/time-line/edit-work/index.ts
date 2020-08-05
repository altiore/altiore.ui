import { reduxForm } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';

import { IEditWorkData } from './@common';
import { EditWorkTsx } from './edit-work';

const formConfig = {
  enableReinitialize: true,
  form: 'EditWorkForm',
  onSubmit: async (values: IEditWorkData, dispatch: any, { patchUserWork }) => {
    return await patchUserWork(values);
  },
  onSubmitSuccess: (res: any, dispatch: ThunkDispatch<any, any, any>, { onClose }: any) => {
    if (onClose) {
      onClose();
    }
  },
};

export default reduxForm<IEditWorkData, any>(formConfig)(EditWorkTsx);
