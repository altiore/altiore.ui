import { connect } from 'react-redux';

import { push, replace } from 'connected-react-router';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail } from '#/@store/@common/helpers';
import { changeSettings } from '#/@store/dialog';
import { routeProjectId, routeTaskSequenceNumber } from '#/@store/router';
import {
  EDIT_TASK_FORM,
  fetchTaskDetails,
  getEditTaskInitialValues,
  getTaskIdBySequenceNumber,
  isCurrent,
  ITaskFormData,
  submitEditTaskForm,
} from '#/@store/tasks';
import { isPaused, startUserWork } from '#/@store/user-works';

import { ITaskFormProps, TaskFormJsx } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  getEditTaskInitialValues,
  getTaskIdBySequenceNumber,
  isCurrent,
  isPaused,
  projectId: routeProjectId,
  sequenceNumber: routeTaskSequenceNumber,
} as any);

const mapDispatchToProps = {
  changeSettings,
  fetchTaskDetails,
  push,
  replace,
  startUserWork,
};

export const PatchTaskForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm<ITaskFormData, ITaskFormProps>({
    destroyOnUnmount: false,
    enableReinitialize: false,
    form: EDIT_TASK_FORM,
    onSubmit: async (values, dispatch) => {
      await submitEditTaskForm(values)(dispatch);
    },
    onSubmitFail,
  })(TaskFormJsx) as any
) as any;
